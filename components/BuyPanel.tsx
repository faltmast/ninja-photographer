"use client";

import { useState } from "react";
import Link from "next/link";
import type { Print } from "@/lib/prints";
import { addToCart } from "@/lib/cart";
import { SHOP_OPEN } from "@/lib/shop";

export function BuyPanel({ print }: { print: Print }) {
  const [i, setI] = useState(0); // start at the base size; small steps invite the upgrade
  const [added, setAdded] = useState(false);
  const size = print.sizes[i];

  function add() {
    addToCart(print.id, size.label);
    setAdded(true);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* size ladder — all prices visible so the small upgrade steps read clearly */}
      <div>
        <p className="text-small tracking-[0.14em] uppercase text-muted mb-2">Size</p>
        <div className="flex flex-col gap-2">
          {print.sizes.map((s, idx) => {
            const active = idx === i;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  setI(idx);
                  setAdded(false);
                }}
                className={`flex items-center justify-between border px-4 py-3 text-left transition-colors ${
                  active ? "border-foreground" : "border-black/15 hover:border-foreground/40"
                }`}
              >
                <span className="flex items-baseline gap-2">
                  <span className="text-body text-foreground">{s.label}</span>
                  <span className="text-small text-muted">{s.dims}</span>
                </span>
                <span className="text-body text-foreground tabular-nums">€{s.price}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* selected price + CTA */}
      <div className="flex items-end justify-between gap-4 pt-1">
        <div>
          <div className="text-title leading-none text-foreground tabular-nums">€{size.price}</div>
        </div>

        {SHOP_OPEN ? (
          <button
            type="button"
            onClick={add}
            className="bg-foreground text-background px-6 py-3 text-small hover:bg-accent transition-colors"
          >
            Add to cart
          </button>
        ) : (
          <span className="border border-black/15 text-muted px-6 py-3 text-small">
            Available soon
          </span>
        )}
      </div>

      {added && (
        <p className="text-small text-muted">
          Added {size.label} to your cart.{" "}
          <Link href="/cart" className="text-accent hover:underline">
            View cart →
          </Link>
        </p>
      )}
    </div>
  );
}
