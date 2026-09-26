"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart";

// Empties the cart once the buyer lands on the order-complete page.
export function ClearCart() {
  useEffect(() => {
    clearCart();
  }, []);
  return null;
}
