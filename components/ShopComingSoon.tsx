import Image from "next/image";
import Link from "next/link";

// Shown instead of the shop while it is closed (see lib/shop.ts).
// Covers the whole screen, including the top bar and footer.
export function ShopComingSoon() {
  return (
    <section className="fixed inset-0 z-50 bg-black">
      <Image
        src="/shop/coming-soon.jpg"
        alt="White houses of a Greek island village at dusk"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <Link
        href="/"
        className="absolute top-4 md:top-5 left-6 md:left-10 text-[22px] md:text-[24px] tracking-tight text-white whitespace-nowrap"
      >
        Ninja Photographer
      </Link>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center pointer-events-none">
        <h1 className="text-[34px] md:text-[56px] leading-tight tracking-tight text-white">
          Shop coming soon
        </h1>
        <Link
          href="/fieldwork"
          className="pointer-events-auto text-[16px] md:text-[18px] text-white/85 hover:text-white hover:underline underline-offset-4"
        >
          ← Back to portfolio
        </Link>
      </div>
    </section>
  );
}
