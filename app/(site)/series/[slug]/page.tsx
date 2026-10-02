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

  return (
    <>
      <div className="px-6 md:px-10 pb-4 flex flex-col md:flex-row md:items-end gap-2 md:gap-10">
        <div className="shrink-0">
          <Link
            href="/series"
            className="text-small text-muted hover:text-foreground transition-colors"
          >
            ← Series
          </Link>
          <h1 className="text-title text-foreground mt-1">{s.title}</h1>
          <p className="text-body text-muted mt-0.5">{s.meta}</p>
        </div>
        <p className="text-lead text-foreground/80 max-w-[760px]">{s.text}</p>
      </div>
      <Gallery photos={s.photos} />
    </>
  );
}
