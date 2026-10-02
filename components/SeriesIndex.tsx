"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Series } from "@/lib/series";

// How many frames of a series can be flipped through on its card.
const PEEK = 6;

// One card per series. The picture is a flip-book of the series:
// desktop = move the mouse across it, phone = it plays while the card is in view.
function SeriesCard({ s, priority }: { s: Series; priority: boolean }) {
  const frames = [s.cover, ...s.photos.filter((p) => p.id !== s.cover.id)].slice(0, PEEK);
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || frames.length < 2) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        if (entry.isIntersecting) {
          timer = setInterval(() => setIdx((i) => (i + 1) % frames.length), 1400);
        } else {
          setIdx(0);
        }
      },
      { threshold: 0.7 },
    );
    io.observe(el);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, [frames.length]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const part = (e.clientX - box.left) / box.width;
    setIdx(Math.min(frames.length - 1, Math.max(0, Math.floor(part * frames.length))));
  };

  return (
    <Link
      ref={ref}
      href={`/series/${s.slug}`}
      className="group flex flex-col h-full shrink-0 snap-center w-[82vw] md:w-[31vw]"
    >
      <div
        className="relative w-full flex-1 overflow-hidden bg-black/[0.03]"
        onMouseMove={onMove}
        onMouseLeave={() => setIdx(0)}
      >
        {frames.map((p, i) => (
          <Image
            key={p.id}
            src={p.src}
            alt={i === 0 ? p.alt || s.title : ""}
            fill
            sizes="(max-width: 768px) 82vw, 31vw"
            className={`object-cover transition-opacity duration-300 ${i === idx ? "opacity-100" : "opacity-0"}`}
            priority={priority && i === 0}
          />
        ))}
        {/* which frame is showing */}
        {frames.length > 1 && (
          <div className="absolute inset-x-0 top-0 flex gap-1 p-2">
            {frames.map((p, i) => (
              <span
                key={p.id}
                className={`h-[3px] flex-1 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/35"}`}
              />
            ))}
          </div>
        )}
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
