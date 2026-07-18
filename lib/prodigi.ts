// Prodigi Print API client — places a fulfilment order after a paid checkout.
// Docs: https://www.prodigi.com/print-api/docs/reference/
// Sandbox by default (safe to test, no real prints). Set PRODIGI_ENV=live to go real.

const BASE =
  process.env.PRODIGI_ENV === "live"
    ? "https://api.prodigi.com/v4.0"
    : "https://api.sandbox.prodigi.com/v4.0";

export const prodigiEnv =
  process.env.PRODIGI_ENV === "live" ? "live" : "sandbox";

export type ProdigiRecipient = {
  name: string;
  email?: string;
  address: {
    line1: string;
    line2?: string;
    postalOrZipCode: string;
    countryCode: string;
    townOrCity: string;
    stateOrCounty?: string;
  };
};

export async function createProdigiOrder(params: {
  merchantReference: string; // Stripe session id — our idempotency handle
  sku: string;
  copies: number;
  imageUrl: string; // publicly reachable print file
  recipient: ProdigiRecipient;
}) {
  const { merchantReference, sku, copies, imageUrl, recipient } = params;

  const res = await fetch(`${BASE}/Orders`, {
    method: "POST",
    headers: {
      "X-API-Key": process.env.PRODIGI_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      merchantReference,
      shippingMethod: "Standard",
      recipient,
      items: [
        {
          sku,
          copies,
          sizing: "fillPrintArea",
          assets: [{ printArea: "default", url: imageUrl }],
        },
      ],
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Prodigi order failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}
