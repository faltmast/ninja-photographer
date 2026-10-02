import type { Photo } from "@/lib/photos";

export type Series = {
  slug: string;
  title: string;
  // Short line under the title, e.g. "Tinos, 2025".
  meta: string;
  text: string;
  cover: Photo;
  photos: Photo[];
};

const ONE_FRAME_A_DAY: Photo[] = [
  { id: "ofad-01", src: "/photos/series/one-frame-a-day/01.jpg", alt: "Ferry docked in a small harbour at night", w: 1333, h: 2000 },
  { id: "ofad-02", src: "/photos/series/one-frame-a-day/02.jpg", alt: "White houses of an island village at dusk", w: 2000, h: 1333 },
  { id: "ofad-03", src: "/photos/series/one-frame-a-day/03.jpg", alt: "Blue shutters behind a window with an orange curtain", w: 2000, h: 1333 },
  { id: "ofad-04", src: "/photos/series/one-frame-a-day/04.jpg", alt: "Frayed rope tying an old blue door shut", w: 2000, h: 1333 },
  { id: "ofad-05", src: "/photos/series/one-frame-a-day/05.jpg", alt: "Two women on a harbour bench at sunset, three cats waiting at their feet", w: 2000, h: 1333 },
  { id: "ofad-06", src: "/photos/series/one-frame-a-day/06.jpg", alt: "Silhouettes of two people reaching for each other's hands at sunset", w: 2000, h: 1333 },
  { id: "ofad-07", src: "/photos/series/one-frame-a-day/07.jpg", alt: "Two people in chairs on a terrace looking down at a bay", w: 2000, h: 1333 },
  { id: "ofad-08", src: "/photos/series/one-frame-a-day/08.jpg", alt: "Sunset in a car's side mirror, seen from the passenger seat", w: 2000, h: 1333 },
  { id: "ofad-09", src: "/photos/series/one-frame-a-day/09.jpg", alt: "Men playing backgammon at a street café", w: 2000, h: 1333 },
  { id: "ofad-10", src: "/photos/series/one-frame-a-day/10.jpg", alt: "Silhouette of a man catching a drone on a beach at dusk", w: 1333, h: 2000 },
  { id: "ofad-11", src: "/photos/series/one-frame-a-day/11.jpg", alt: "Man standing in front of a waterfall", w: 1333, h: 2000 },
];

// Highlighted projects. Order here = order on /series.
// The "Series" menu item only shows once this list has an entry.
export const series: Series[] = [
  {
    slug: "one-frame-a-day",
    title: "One Frame A Day",
    meta: "Greece 2026",
    text: "Four weeks in Greece, one frame a day. I connect with the people I meet along the way and capture the moments and experiences we share.",
    cover: ONE_FRAME_A_DAY[5],
    photos: ONE_FRAME_A_DAY,
  },
];

export function getSeries(slug: string) {
  return series.find((s) => s.slug === slug);
}
