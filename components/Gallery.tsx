"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/lib/photos";

// `after` is an optional last tile, shown behind the final photo.
export function Gallery({ photos, after }: { photos: Photo[]; after?: React.ReactNode }) {
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
        className="flex flex-row gap-2 md:gap-3 h-full
                   overflow-x-auto overflow-y-hidden snap-x snap-proximity md:snap-none"
      >
        {photos.map((photo, idx) => {
          const aspect = photo.w / photo.h;
          return (
            <div
              key={photo.id}
              className="relative bg-black/[0.02] h-full shrink-0 snap-start"
              style={{ aspectRatio: `${aspect}` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 150vw, 50vw"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          );
        })}
        {after}
      </div>
    </section>
  );
}
