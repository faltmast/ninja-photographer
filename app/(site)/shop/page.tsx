import { Shop } from "@/components/Shop";
import { prints } from "@/lib/prints";

export const metadata = { title: "Shop — Ninja Photographer" };

export default function ShopPage() {
  return <Shop prints={prints} />;
}
