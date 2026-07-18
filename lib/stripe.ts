import Stripe from "stripe";

// Server-only Stripe client. The fallback keeps `next build` from throwing when
// the key isn't set yet (CI / first clone); real calls need a real key at runtime.
// apiVersion is intentionally omitted so we ride the account's default.
// .trim() guards against a stray newline/space sneaking in when the key is
// pasted into an env-var UI — that produces an "Invalid character in header" error.
export const stripe = new Stripe(
  (process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build").trim()
);
