import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { getSeries, series } from "@/lib/series";

export function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSeries(slug);
  return {
    title: s ? `${s.title} — Ninja Photographer` : "Series — Ninja Photographer",
  };
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSeries(slug);
  if (!s) notFound();

  // Neighbours in the list (wrapping around), so people can go from project to project.
  const i = series.indexOf(s);
  const many = series.length > 1;
  const next = many ? series[(i + 1) % series.length] : null;
  const prev = series.length > 2 ? series[(i - 1 + series.length) % series.length] : null;
  const nextTile = next && (
    <Link
      href={`/series/${next.slug}`}
      className="group relative h-full shrink-0 snap-start w-[82vw] md:w-[31vw] overflow-hidden"
    >
      <Image
        src={next.cover.src}
        alt=""
        fill
        sizes="(max-width: 768px) 82vw, 31vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
        <p className="text-body text-white/80">Next series</p>
        <p className="text-display mt-1">{next.title}</p>
        <p className="text-lead mt-4 underline underline-offset-4">→ View</p>
      </div>
    </Link>
  );

  return (
    <>
      <div className="px-6 md:px-10 pb-5 md:pb-7">
        {/* always in view: back to the list, and straight on to the neighbouring series */}
        <div className="flex items-center justify-between gap-4 text-body border-t border-black/10 pt-3">
          <Link href="/series" className="text-muted hover:text-foreground transition-colors">
            ← All series
          </Link>
          {next && (
            <nav className="flex items-center gap-5 md:gap-8">
              {prev && (
                <Link
                  href={`/series/${prev.slug}`}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  ← Previous
                </Link>
              )}
              <Link href={`/series/${next.slug}`} className="text-foreground hover:text-accent transition-colors">
                Next<span className="hidden md:inline">: {next.title}</span> →
              </Link>
            </nav>
          )}
        </div>
        {/* two columns on one grid: big title left, place and text right, both starting at the same height */}
        <div className="mt-3 md:mt-5 grid md:grid-cols-2 gap-x-10 gap-y-3 items-start">
          <h1 className="text-display text-foreground">{s.title}</h1>
          <div className="md:pt-2">
            <p className="text-small uppercase tracking-[0.14em] text-muted">{s.meta}</p>
            <p className="text-lead text-foreground/80 mt-2 max-w-[34em]">{s.text}</p>
          </div>
        </div>
      </div>
      <Gallery photos={s.photos} after={nextTile} />
    </>
  );
}
