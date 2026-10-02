"use client";

import Image from "next/image";
import Link from "next/link";
import { galleries } from "@/lib/photos";
import { series, type Series } from "@/lib/series";

// Preview data: the real series plus two stand-ins built from existing photos,
// so each layout can be judged with more than one project.
const f = galleries.fieldwork;
const items: Series[] = [
  ...series,
  {
    slug: "one-frame-a-day",
    title: "Example Project Two",
    meta: "Place, Year",
    text: "Stand-in text. Two short sentences that say what this project is and why it exists.",
    cover: f[5],
    photos: [f[5], f[3], f[7], f[8], f[12], f[2]],
  },
  {
    slug: "one-frame-a-day",
    title: "Example Project Three",
    meta: "Place, Year",
    text: "Stand-in text. Two short sentences that say what this project is and why it exists.",
    cover: f[7],
    photos: [f[7], f[8], f[3], f[12], f[5], f[0]],
  },
];

const href = (s: Series) => `/series/${s.slug}`;
const num = (i: number) => String(i + 1).padStart(2, "0");

// 1. One project per screen. Image behind the menu, big title, one clear link.
function FullScreen() {
  return (
    <div className="flex-1 min-h-0 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
      {items.map((s, i) => (
        <Link key={i} href={href(s)} className="group relative w-full h-full shrink-0 snap-center">
          <Image src={s.cover.src} alt={s.cover.alt || s.title} fill sizes="100vw" className="object-cover" priority={i === 0} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/45" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-14 text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
            <p className="text-body text-white/80 mb-2">
              Series {num(i)} / {num(items.length - 1)}
            </p>
            <h2 className="text-display">{s.title}</h2>
            <p className="text-lead text-white/90 mt-1">{s.meta}</p>
            <p className="text-lead mt-5 underline underline-offset-4 group-hover:text-white/70">
              → View the series
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// 2. A list in very large type. The title is the link.
function BigList() {
  return (
    <section className="flex-1 min-h-0 overflow-y-auto px-6 md:px-10 pb-8">
      {items.map((s, i) => (
        <Link
          key={i}
          href={href(s)}
          className="group flex items-center gap-4 md:gap-8 border-t border-black/10 py-5 md:py-7"
        >
          <div className="relative w-24 h-24 md:w-56 md:h-36 shrink-0 overflow-hidden bg-black/[0.03]">
            <Image src={s.cover.src} alt="" fill sizes="(max-width: 768px) 96px, 224px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-display text-foreground group-hover:text-accent transition-colors">{s.title}</h2>
            <p className="text-lead text-muted mt-1">
              {s.meta} · {s.photos.length} frames
            </p>
          </div>
          <span className="hidden md:block text-display text-muted group-hover:text-accent transition-colors">→</span>
        </Link>
      ))}
    </section>
  );
}

// 3. Text on one side, cover on the other. Room for the two sentences and a button.
function Split() {
  return (
    <section className="flex-1 min-h-0 overflow-y-auto px-2 md:px-3 pb-3">
      {items.map((s, i) => (
        <Link
          key={i}
          href={href(s)}
          className="group flex flex-col-reverse md:flex-row md:h-[72vh] mb-10 md:mb-3"
        >
          <div className="md:w-[42%] px-4 md:px-7 pt-4 md:pt-0 flex flex-col justify-end md:pb-2">
            <p className="text-body text-muted">{num(i)}</p>
            <h2 className="text-display text-foreground mt-1">{s.title}</h2>
            <p className="text-lead text-muted mt-1">{s.meta}</p>
            <p className="text-lead text-foreground/80 mt-4 max-w-[30em]">{s.text}</p>
            <span className="self-start mt-6 text-body border border-foreground px-5 py-3 group-hover:bg-foreground group-hover:text-white transition-colors">
              View the series →
            </span>
          </div>
          <div className="relative aspect-[3/2] md:aspect-auto md:flex-1 overflow-hidden bg-black/[0.03]">
            <Image src={s.cover.src} alt={s.cover.alt || s.title} fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" priority={i === 0} />
          </div>
        </Link>
      ))}
    </section>
  );
}

// 4. Tall cards side by side, like the galleries. Bigger type than today.
function Strip() {
  return (
    <section className="flex-1 px-2 md:px-3 pb-3 min-h-0 overflow-hidden">
      <div className="flex gap-4 md:gap-5 h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory md:snap-none">
        {items.map((s, i) => (
          <Link key={i} href={href(s)} className="group flex flex-col h-full shrink-0 snap-center w-[82vw] md:w-[31vw]">
            <div className="relative w-full flex-1 overflow-hidden bg-black/[0.03]">
              <Image src={s.cover.src} alt={s.cover.alt || s.title} fill sizes="(max-width: 768px) 82vw, 31vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" priority={i === 0} />
            </div>
            <div className="pt-3 pb-1 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-title text-foreground">{s.title}</h2>
                <p className="text-body text-muted">
                  {s.meta} · {s.photos.length} frames
                </p>
              </div>
              <span className="text-body text-accent group-hover:underline underline-offset-4 shrink-0">View →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// 5. Cover plus a few more frames from inside the series, as a taste of what is behind the link.
function Mosaic() {
  return (
    <section className="flex-1 min-h-0 overflow-y-auto px-2 md:px-3 pb-3">
      {items.map((s, i) => (
        <Link key={i} href={href(s)} className="group block mb-10 md:mb-14">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 md:h-[58vh]">
            <div className="relative col-span-3 md:col-span-2 md:row-span-2 aspect-[3/2] md:aspect-auto overflow-hidden bg-black/[0.03]">
              <Image src={s.cover.src} alt={s.cover.alt || s.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority={i === 0} />
            </div>
            {s.photos
              .filter((p) => p.id !== s.cover.id)
              .slice(0, 4)
              .map((p, k) => (
                <div key={p.id} className={`relative aspect-square md:aspect-auto overflow-hidden bg-black/[0.03] ${k === 3 ? "hidden md:block" : ""}`}>
                  <Image src={p.src} alt="" fill sizes="(max-width: 768px) 33vw, 25vw" className="object-cover" />
                </div>
              ))}
          </div>
          <div className="px-4 md:px-7 pt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
            <div>
              <h2 className="text-display text-foreground">{s.title}</h2>
              <p className="text-lead text-muted mt-1">{s.meta}</p>
            </div>
            <span className="text-lead text-accent group-hover:underline underline-offset-4">
              View all {s.photos.length} frames →
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}

export function SeriesMenuLab({ variant }: { variant: number }) {
  return [<FullScreen key={1} />, <BigList key={2} />, <Split key={3} />, <Strip key={4} />, <Mosaic key={5} />][variant - 1];
}
