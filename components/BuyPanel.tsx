"use client";

import { useState } from "react";
import type { Print } from "@/lib/prints";

export function BuyPanel({ print }: { print: Print }) {
  const [i, setI] = useState(0); // start at the base size; small steps invite the upgrade
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const size = print.sizes[i];

  async function acquire() {
    if (loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ printId: print.id, sizeLabel: size.label }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // → Stripe Checkout
      } else {
        setError(true);
        setLoading(false);
      }
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* size ladder — all prices visible so the small upgrade steps read clearly */}
      <div>
        <p className="text-[11px] tracking-[0.14em] uppercase text-muted mb-2">Size</p>
        <div className="flex flex-col gap-2">
          {print.sizes.map((s, idx) => {
            const active = idx === i;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => setI(idx)}
                className={`flex items-center justify-between border px-4 py-3 text-left transition-colors ${
                  active ? "border-foreground" : "border-black/15 hover:border-foreground/40"
                }`}
              >
                <span className="flex items-baseline gap-2">
                  <span className="text-[15px] text-foreground">{s.label}</span>
                  <span className="text-[12px] text-muted">{s.dims}</span>
                </span>
                <span className="text-[15px] text-foreground tabular-nums">€{s.price}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* selected price + CTA */}
      <div className="flex items-end justify-between gap-4 pt-1">
        <div>
          <div className="text-[28px] leading-none text-foreground tabular-nums">€{size.price}</div>
        </div>

        <button
          type="button"
          onClick={acquire}
          disabled={loading}
          className="bg-foreground text-background px-6 py-3 text-[13px] hover:bg-accent transition-colors disabled:opacity-50"
        >
          {loading ? "One moment…" : "Acquire →"}
        </button>
      </div>

      {error && (
        <p className="text-[12px] text-muted">
          Couldn&apos;t open checkout just now. Please try again in a moment.
        </p>
      )}
    </div>
  );
}
