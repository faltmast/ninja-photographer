"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Series } from "@/lib/series";

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
          <Link
            key={s.slug}
            href={`/series/${s.slug}`}
            className="group flex flex-col h-full shrink-0 snap-center
                       w-[80vw] md:w-[34vw] md:min-w-[260px] md:max-w-[380px]"
          >
            <div className="relative w-full flex-1 bg-black/[0.02] overflow-hidden">
              <Image
                src={s.cover.src}
                alt={s.cover.alt || s.title}
                fill
                sizes="(max-width: 768px) 80vw, 34vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority={idx === 0}
              />
            </div>

            <div className="pt-3 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lead text-foreground">{s.title}</h2>
                <p className="text-small text-muted mt-0.5">{s.meta}</p>
              </div>
              <span className="text-body text-accent group-hover:underline underline-offset-4 shrink-0">
                View →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
