import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyPanel } from "@/components/BuyPanel";
import { getPrint, prints } from "@/lib/prints";

export function generateStaticParams() {
  return prints.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const print = getPrint(id);
  return {
    title: print ? `${print.title} — Ninja Photographer` : "Shop — Ninja Photographer",
  };
}

export default async function PrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const print = getPrint(id);
  if (!print) notFound();

  return (
    <section className="flex-1 min-h-0 px-2 md:px-3 pb-3 overflow-y-auto md:overflow-hidden">
      <div className="h-full flex flex-col md:flex-row gap-6 md:gap-10">
        {/* image */}
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:flex-[1.5] md:h-full bg-black/[0.02]">
          <Image
            src={print.src}
            alt={print.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain"
            priority
          />
        </div>

        {/* details */}
        <aside className="md:w-[380px] md:h-full md:overflow-y-auto flex flex-col gap-6 pb-8">
          <Link
            href="/shop"
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            ← Prints
          </Link>

          <div>
            <h1 className="text-[26px] leading-tight text-foreground">{print.title}</h1>
            <p className="text-[14px] text-muted mt-1">{print.meta}</p>
          </div>

          <p className="text-[15px] leading-relaxed text-foreground/80">{print.story}</p>

          <div className="border-t border-black/10 pt-4 flex flex-col gap-1.5 text-[13px] text-muted">
            <div className="flex justify-between">
              <span>Paper</span>
              <span className="text-foreground">{print.paper}</span>
            </div>
            <div className="flex justify-between">
              <span>Printer</span>
              <span className="text-foreground">Canon imagePROGRAF PRO, 12-pigment</span>
            </div>
          </div>

          <div className="border-t border-black/10 pt-5">
            <BuyPanel print={print} />
          </div>
        </aside>
      </div>
    </section>
  );
}
