import { stripe } from "@/lib/stripe";
import { getPrint } from "@/lib/prints";

// Buyer clicks "Acquire" → this creates a Stripe Checkout session for the chosen
// size and returns its URL. Price comes straight from lib/prints.ts (no Stripe-side
// product setup needed), so adding/repricing prints is a one-file edit.
export async function POST(request: Request) {
  try {
    const { printId, sizeLabel } = await request.json();

    const print = getPrint(printId);
    if (!print) {
      return Response.json({ error: "Unknown print" }, { status: 400 });
    }
    const size = print.sizes.find((s) => s.label === sizeLabel);
    if (!size) {
      return Response.json({ error: "Unknown size" }, { status: 400 });
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(size.price * 100),
            product_data: {
              name: `${print.title} — ${size.label}`,
              description: `${print.meta} · Archival fine-art giclée · ${size.dims}`,
            },
          },
        },
      ],
      // Need the buyer's address so the lab can ship the print to them.
      shipping_address_collection: {
        allowed_countries: [
          "DE", "AT", "CH", "FR", "NL", "BE", "LU", "IT", "ES", "PT",
          "DK", "SE", "FI", "IE", "PL", "CZ", "GB", "US",
        ],
      },
      // Carried into the Stripe email + dashboard so fulfilment is unambiguous.
      metadata: {
        printId: print.id,
        title: print.title,
        size: size.label,
        priceEUR: String(size.price),
        fulfilment: "prodigi", // paid → webhook auto-orders from Prodigi, ships to buyer
      },
      success_url: `${site}/order/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/shop/${print.id}`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] error:", err);
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}
