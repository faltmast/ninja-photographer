import Image from "next/image";

// Shown instead of the shop while it is closed (see lib/shop.ts).
// The image runs behind the top bar (see isOverImage in TopBar) down to the footer.
export function ShopComingSoon() {
  return (
    <div className="relative flex-1 min-h-0 w-full overflow-hidden">
      <Image
        src="/shop/coming-soon.jpg"
        alt="White houses of a Greek island village at dusk"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      {/* a little extra shade at the top, where the white menu sits */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/20" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1 className="text-display text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          Shop coming soon
        </h1>
      </div>
    </div>
  );
}
