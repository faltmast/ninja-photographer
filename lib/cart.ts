"use client";

import { useSyncExternalStore } from "react";
import { MAX_QTY } from "@/lib/shop";

// Cart lives in the buyer's browser (localStorage) — no accounts, no database.
export type CartItem = { printId: string; size: string; qty: number };

const KEY = "np-cart";
const EMPTY: CartItem[] = [];
let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) items = JSON.parse(raw);
  } catch {
    items = EMPTY;
  }
}

function save(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // private mode / blocked storage: cart still works for this page view
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart(): CartItem[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return items;
    },
    () => EMPTY
  );
}

export function addToCart(printId: string, size: string) {
  load();
  const found = items.find((i) => i.printId === printId && i.size === size);
  save(
    found
      ? items.map((i) => (i === found ? { ...i, qty: Math.min(i.qty + 1, MAX_QTY) } : i))
      : [...items, { printId, size, qty: 1 }]
  );
}

export function setQty(printId: string, size: string, qty: number) {
  load();
  save(
    qty <= 0
      ? items.filter((i) => !(i.printId === printId && i.size === size))
      : items.map((i) =>
          i.printId === printId && i.size === size ? { ...i, qty: Math.min(qty, MAX_QTY) } : i
        )
  );
}

export function clearCart() {
  save(EMPTY);
}
