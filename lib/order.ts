// Compact cart encoding for Stripe metadata (values are capped at 500 chars):
// "rooftop:A3:2,coast:A2:1"
export type OrderItem = { printId: string; size: string; qty: number };

export function encodeOrderItems(items: OrderItem[]): string {
  return items.map((i) => `${i.printId}:${i.size}:${i.qty}`).join(",");
}

export function decodeOrderItems(value: string | undefined): OrderItem[] {
  if (!value) return [];
  return value.split(",").map((part) => {
    const [printId, size, qty] = part.split(":");
    return { printId, size, qty: Number(qty) || 1 };
  });
}
