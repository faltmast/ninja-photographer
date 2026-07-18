import { stripe } from "@/lib/stripe";
import { getPrint, prodigiSkuFor } from "@/lib/prints";
import { createProdigiOrder } from "@/lib/prodigi";

// Stripe calls this after a completed payment. We verify the signature, then
// place the print order with Prodigi automatically (hands-off fulfilment).
// Needs STRIPE_WEBHOOK_SECRET (from the Stripe dashboard webhook) in env.
export async function POST(request: Request) {
  const body = await request.text(); // raw body required for signature check
  const sig = request.headers.get("stripe-signature") ?? "";
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = event.data.object as any;
    try {
      await fulfil(session);
    } catch (err) {
      // Log loudly and still return 200. The order and address are in the Stripe
      // dashboard, so a failed auto-order can always be fulfilled by hand.
      console.error(
        "[webhook] MANUAL FULFILMENT NEEDED — Prodigi order failed for session",
        session.id,
        err
      );
    }
  }

  return new Response("ok", { status: 200 });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function fulfil(session: any) {
  const printId: string | undefined = session.metadata?.printId;
  const sizeLabel: string | undefined = session.metadata?.size;

  const print = printId ? getPrint(printId) : undefined;
  if (!print) throw new Error(`Unknown printId in session: ${printId}`);

  const sku = sizeLabel ? prodigiSkuFor(sizeLabel) : undefined;
  if (!sku || sku.startsWith("TODO")) {
    throw new Error(`No real Prodigi SKU set for size "${sizeLabel}"`);
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  const imageUrl = print.printFileUrl || `${site}${print.src}`;

  // Stripe moved shipping between API versions — check every likely spot.
  const shipping =
    session.shipping_details ??
    session.collected_information?.shipping_details ??
    session.customer_details;
  const addr = shipping?.address;
  if (!addr) throw new Error("No shipping address on the checkout session");

  const recipient = {
    name: shipping?.name ?? session.customer_details?.name ?? "Customer",
    email: session.customer_details?.email ?? undefined,
    address: {
      line1: addr.line1,
      line2: addr.line2 ?? undefined,
      postalOrZipCode: addr.postal_code,
      countryCode: addr.country,
      townOrCity: addr.city,
      stateOrCounty: addr.state ?? undefined,
    },
  };

  const order = await createProdigiOrder({
    merchantReference: session.id,
    sku,
    copies: 1,
    imageUrl,
    recipient,
  });

  console.log(
    "[webhook] Prodigi order placed for session",
    session.id,
    "->",
    order?.order?.id ?? "(no id returned)"
  );
}
