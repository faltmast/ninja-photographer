import Stripe from "stripe";

// Server-only Stripe client. The fallback keeps `next build` from throwing when
// the key isn't set yet (CI / first clone); real calls need a real key at runtime.
// apiVersion is intentionally omitted so we ride the account's default.
// Strip any character that can't legally appear in an HTTP header value
// (newlines, spaces, hidden/non-ASCII characters). Pasting the key into an
// env-var UI can introduce these mid-string, which throws
// "Invalid character in header content [Authorization]". Stripe keys are only
// [A-Za-z0-9_], so removing everything outside printable ASCII is safe.
const stripeKey = (
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build"
).replace(/[^\x21-\x7E]/g, "");

export const stripe = new Stripe(stripeKey);
