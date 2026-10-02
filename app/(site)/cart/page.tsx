import { redirect } from "next/navigation";
import { CartView } from "@/components/CartView";
import { SHOP_OPEN } from "@/lib/shop";

export const metadata = { title: "Cart — Ninja Photographer" };

export default function CartPage() {
  if (!SHOP_OPEN) redirect("/shop");
  return (
    <section className="flex-1 min-h-0 overflow-y-auto px-6 md:px-10 py-8">
      <div className="max-w-[680px] mx-auto pb-16">
        <h1 className="text-title text-foreground mb-6">Cart</h1>
        <CartView />
      </div>
    </section>
  );
}
