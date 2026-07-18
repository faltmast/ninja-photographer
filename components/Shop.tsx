"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { fromPrice, type Print } from "@/lib/prints";

export function Shop({ prints }: { prints: Print[] }) {
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
        className="flex flex-col md:flex-row gap-8 md:gap-5 h-full
                   overflow-y-auto md:overflow-y-hidden md:overflow-x-auto"
      >
        {prints.map((p, idx) => {
          return (
            <Link
              key={p.id}
              href={`/shop/${p.id}`}
              className="group flex flex-col md:h-full md:shrink-0
                         md:w-[34vw] md:min-w-[260px] md:max-w-[380px]"
            >
              <div className="relative w-full md:flex-1 aspect-[4/5] md:aspect-auto bg-black/[0.02] overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  priority={idx === 0}
                />
              </div>

              <div className="pt-3 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[18px] leading-tight text-foreground">{p.title}</h2>
                  <p className="text-[13px] text-muted mt-0.5">{p.meta}</p>
                  <p className="text-[11px] text-muted mt-2 tracking-[0.12em] uppercase">
                    Archival fine-art print
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[16px] text-foreground">
                    {`from €${fromPrice(p)}`}
                  </div>
                  <span className="text-[13px] text-accent group-hover:underline underline-offset-4">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
