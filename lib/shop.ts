// Master switch for selling. Closed until prints can actually be fulfilled
// (real Prodigi SKUs + print-resolution files). Set NEXT_PUBLIC_SHOP_OPEN=true
// in Vercel and redeploy to open the shop.
export const SHOP_OPEN = process.env.NEXT_PUBLIC_SHOP_OPEN === "true";

export const MAX_QTY = 10;
