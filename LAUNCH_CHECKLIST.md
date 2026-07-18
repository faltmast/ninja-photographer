# Shop — Launch Checklist

Status as of 9 Jul 2026. Build passes, dev runs, Stripe wired in **test mode**.
Legend: 🔴 blocks a real sale · 🟠 needed for a clean/legal launch · 🟢 polish

---

## 🔴 Blockers — nothing real sells until these are done
- [ ] **Switch Stripe to LIVE keys** — currently `sk_test…`. Add `sk_live` + publishable + **webhook secret** (`whsec`) to prod env.
- [ ] **Set `NEXT_PUBLIC_SITE_URL`** to the production domain — success/cancel URLs are built from it; empty/wrong = broken redirect after payment.
- [ ] **Deploy to Vercel + connect the domain** (ninja-photographer.com or chosen URL). It only runs locally right now.
- [ ] **Fill the Impressum** — 6 placeholders left (name, address, contact, Steuernummer / USt-IdNr). Legally required to operate a German shop.

## 🔴 Fulfillment — how an order actually becomes a shipped print
- [ ] **Order notification** — no Stripe webhook yet. Decide how you learn a sale happened + capture the shipping address (webhook → email, or Stripe dashboard alerts).
- [ ] **Print + ship process** — which lab, turnaround, packaging, tracking. (No point selling A2 giclée with no way to make it.)
- [ ] **Buyer confirmation email** — "order received, ships in X days."

## 🟠 Money mechanics
- [ ] **VAT decision** — checkout has no tax. Kleinunternehmer §19 (no USt, add the notice) vs charge 19% (enable Stripe Tax / show USt). You're a registered pro, so this needs a real answer.
- [ ] **Shipping cost** — address is collected but shipping is currently free. Add flat-rate `shipping_options` or decide free-and-baked-into-price.
- [ ] **Confirm allowed shipping countries** in the checkout route.

## 🟠 The catalog (currently placeholder)
- [ ] **Pick the real photos to sell** (only 3 placeholders now, reusing fieldwork/collab images).
- [ ] **Real titles + stories + final prices** (flat €50/70/90 placeholder across all).
- [ ] **Print-resolution files** for the lab (display images ≠ print-res).
- [ ] Fill remaining legal-page blanks: AGB (1), Datenschutz (3), Widerruf (4).

## 🟢 Pre-launch polish
- [ ] **End-to-end test checkout** in test mode (select size → Stripe test card → `/order/complete`).
- [ ] **Commit the working state** — the whole rebuild + shop is uncommitted right now.
- [ ] SEO/meta + OG images for shop pages, favicon.
- [ ] Mobile pass on `/shop` and `/shop/[id]`.
