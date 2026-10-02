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

  // The series after this one (wraps around), so people can go from project to project.
  const next = series.length > 1 ? series[(series.indexOf(s) + 1) % series.length] : null;
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
      <Gallery photos={s.photos} after={nextTile} />
    </>
  );
}
