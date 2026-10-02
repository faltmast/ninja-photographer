"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPrint } from "@/lib/prints";
import { setQty, useCart } from "@/lib/cart";
import { MAX_QTY, SHOP_OPEN } from "@/lib/shop";

export function CartView() {
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Drop anything that no longer exists in the catalogue (renamed print/size).
  const lines = cart.flatMap((item) => {
    const print = getPrint(item.printId);
    const size = print?.sizes.find((s) => s.label === item.size);
    return print && size ? [{ item, print, size }] : [];
  });
  const total = lines.reduce((sum, l) => sum + l.size.price * l.item.qty, 0);

  async function checkout() {
    if (loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({ printId: l.print.id, size: l.size.label, qty: l.item.qty })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url); // → Stripe Checkout
        return;
      }
    } catch {}
    setError(true);
    setLoading(false);
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-body text-foreground/80">Your cart is empty.</p>
        <Link href="/shop" className="text-small text-accent hover:underline">
          ← Browse prints
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col divide-y divide-black/10 border-y border-black/10">
        {lines.map(({ item, print, size }) => (
          <li key={`${print.id}-${size.label}`} className="flex gap-4 py-4">
            <Link href={`/shop/${print.id}`} className="relative w-20 h-20 shrink-0 bg-black/[0.02]">
              <Image src={print.src} alt={print.title} fill sizes="80px" className="object-contain" />
            </Link>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <Link href={`/shop/${print.id}`} className="text-body text-foreground hover:text-accent">
                {print.title}
              </Link>
              <span className="text-small text-muted">
                {size.label} · {size.dims} · €{size.price}
              </span>
              <div className="flex items-center gap-3 mt-1 text-body">
                <button
                  type="button"
                  aria-label="One less"
                  onClick={() => setQty(print.id, size.label, item.qty - 1)}
                  className="w-8 h-8 border border-black/15 hover:border-foreground/40"
                >
                  −
                </button>
                <span className="tabular-nums w-4 text-center">{item.qty}</span>
                <button
                  type="button"
                  aria-label="One more"
                  disabled={item.qty >= MAX_QTY}
                  onClick={() => setQty(print.id, size.label, item.qty + 1)}
                  className="w-8 h-8 border border-black/15 hover:border-foreground/40 disabled:opacity-40"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setQty(print.id, size.label, 0)}
                  className="ml-2 text-small text-muted hover:text-foreground"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-body text-foreground tabular-nums">€{size.price * item.qty}</div>
          </li>
        ))}
      </ul>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-small tracking-[0.14em] uppercase text-muted">Total</p>
          <div className="text-title leading-none text-foreground tabular-nums mt-1">€{total}</div>
        </div>
        {SHOP_OPEN ? (
          <button
            type="button"
            onClick={checkout}
            disabled={loading}
            className="bg-foreground text-background px-6 py-3 text-small hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? "One moment…" : "Checkout →"}
          </button>
        ) : (
          <span className="border border-black/15 text-muted px-6 py-3 text-small">
            Available soon
          </span>
        )}
      </div>

      <p className="text-small text-muted">
        All prices are final. No VAT is charged (small business, § 19 UStG). Everything in
        your cart ships in one order.
      </p>

      {error && (
        <p className="text-small text-muted">
          Couldn&apos;t open checkout just now. Please try again in a moment.
        </p>
      )}
    </div>
  );
}
