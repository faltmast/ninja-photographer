import { Shop } from "@/components/Shop";
import { ShopComingSoon } from "@/components/ShopComingSoon";
import { prints } from "@/lib/prints";
import { SHOP_OPEN } from "@/lib/shop";

export const metadata = { title: "Shop — Ninja Photographer" };

export default function ShopPage() {
  if (!SHOP_OPEN) return <ShopComingSoon />;
  return <Shop prints={prints} />;
}
