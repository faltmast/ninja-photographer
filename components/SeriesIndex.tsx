"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Series } from "@/lib/series";

function SeriesCard({ s, priority }: { s: Series; priority: boolean }) {
  return (
    <Link
      href={`/series/${s.slug}`}
      className="group flex flex-col h-full shrink-0 snap-center w-[82vw] md:w-[31vw]"
    >
      <div className="relative w-full flex-1 overflow-hidden bg-black/[0.03]">
        <Image
          src={s.cover.src}
          alt={s.cover.alt || s.title}
          fill
          sizes="(max-width: 768px) 82vw, 31vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority={priority}
        />
      </div>

      <div className="pt-3 pb-1 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-title text-foreground">{s.title}</h2>
          <p className="text-body text-muted">
            {s.meta} · {s.photos.length} frames
          </p>
        </div>
        <span className="text-body text-accent group-hover:underline underline-offset-4 shrink-0">
          View →
        </span>
      </div>
    </Link>
  );
}

export function SeriesIndex({ series }: { series: Series[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Mirror Gallery: translate vertical wheel into horizontal scroll on desktop.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;
    const onWheel = (e: WheelEvent) => {
      if (!isDesktop()) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="flex-1 px-2 md:px-3 pb-3 min-h-0 overflow-hidden">
      <div
        ref={scrollerRef}
        className="flex flex-row gap-4 md:gap-5 h-full
                   overflow-x-auto overflow-y-hidden snap-x snap-mandatory md:snap-none"
      >
        {series.map((s, idx) => (
          <SeriesCard key={s.slug} s={s} priority={idx === 0} />
        ))}
      </div>
    </section>
  );
}
