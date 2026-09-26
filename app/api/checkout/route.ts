import { stripe } from "@/lib/stripe";
import { getPrint } from "@/lib/prints";
import { MAX_QTY, SHOP_OPEN } from "@/lib/shop";
import { encodeOrderItems, type OrderItem } from "@/lib/order";

// Buyer clicks "Checkout" in the cart → this creates one Stripe Checkout session
// for every print in it and returns its URL. Prices come straight from
// lib/prints.ts (no Stripe-side product setup needed), so adding/repricing prints
// is a one-file edit.
export async function POST(request: Request) {
  if (!SHOP_OPEN) {
    return Response.json({ error: "Shop is not open yet" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const raw: unknown[] = Array.isArray(body?.items) ? body.items : [];
    if (raw.length === 0 || raw.length > 20) {
      return Response.json({ error: "Invalid cart" }, { status: 400 });
    }

    const lines = [];
    const items: OrderItem[] = [];
    for (const entry of raw) {
      const { printId, size: sizeLabel, qty } = (entry ?? {}) as Record<string, unknown>;
      const print = typeof printId === "string" ? getPrint(printId) : undefined;
      const size = print?.sizes.find((s) => s.label === sizeLabel);
      const quantity = Number(qty);
      if (!print || !size || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
        return Response.json({ error: "Invalid cart item" }, { status: 400 });
      }
      items.push({ printId: print.id, size: size.label, qty: quantity });
      lines.push({
        quantity,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(size.price * 100),
          product_data: {
            name: `${print.title} — ${size.label}`,
            description: `${print.meta} · Archival fine-art giclée · ${size.dims}`,
          },
        },
      });
    }

    // Return the buyer to the domain they bought on (vercel.app or the custom
    // domain), so a domain switch needs no env change.
    const site =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lines,
      // Need the buyer's address so the lab can ship the prints to them.
      shipping_address_collection: {
        allowed_countries: [
          "DE", "AT", "CH", "FR", "NL", "BE", "LU", "IT", "ES", "PT",
          "DK", "SE", "FI", "IE", "PL", "CZ", "GB", "US",
        ],
      },
      // Read by the webhook to place one Prodigi order with every print.
      metadata: {
        items: encodeOrderItems(items),
        fulfilment: "prodigi", // paid → webhook auto-orders from Prodigi, ships to buyer
      },
      success_url: `${site}/order/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/cart`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] error:", err);
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}
