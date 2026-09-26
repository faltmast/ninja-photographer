"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { SHOP_OPEN } from "@/lib/shop";

// "Cart (3)" in the top bar — only once something is in it.
export function CartLink() {
  const count = useCart().reduce((n, i) => n + i.qty, 0);
  if (!SHOP_OPEN || count === 0) return null;
  return (
    <Link href="/cart" className="text-foreground hover:text-accent transition-colors">
      Cart ({count})
    </Link>
  );
}
