"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/lib/photos";

export function Gallery({ photos }: { photos: Photo[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

    const onWheel = (e: WheelEvent) => {
      if (!isDesktop()) return;
      // Translate vertical wheel into horizontal scroll. Trackpads send deltaX
      // already; only intercept when the primary intent is vertical.
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
        className="flex flex-col md:flex-row gap-2 md:gap-3 h-full
                   overflow-y-auto md:overflow-y-hidden md:overflow-x-auto"
      >
        {photos.map((photo, idx) => {
          const aspect = photo.w / photo.h;
          return (
            <div
              key={photo.id}
              className="relative bg-black/[0.02] w-full md:w-auto md:h-full md:shrink-0"
              style={{ aspectRatio: `${aspect}` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
