export type PrintSize = {
  label: string; // "A3"
  dims: string;  // "30 × 42 cm"
  price: number; // euros
  popular?: boolean; // marks the hero tier ("most popular")
  // stripeUrl?: string;  // wired when payments are connected
};

export type Print = {
  id: string;          // slug used in /shop/[id]
  title: string;
  meta: string;        // "Berlin · 2024"
  story: string;       // the told story, in the narrator's voice
  src: string;         // /photos/...
  w: number;
  h: number;
  paper: string;       // "Archival matte fine-art, 270gsm · giclée"
  printFileUrl?: string; // high-res file Prodigi prints from; falls back to the web image
  sizes: PrintSize[];
};

// Placeholder content — images reuse existing sets; titles/stories/prices are
// editable. Open archival prints: made to order, no editions / no scarcity.
export const prints: Print[] = [
  {
    id: "rooftop",
    title: "Rooftop, 4 A.M.",
    meta: "Berlin · 2024",
    story:
      "They told me the roof was closed. I said I was with the band. There was no band. This is the city at 4 a.m. when a locked door decides it likes you.",
    src: "/photos/fieldwork/DSC02270.jpg",
    w: 1000,
    h: 667,
    paper: "Archival matte fine-art, 270gsm · giclée",
    sizes: [
      { label: "A4", dims: "21 × 30 cm", price: 50 },
      { label: "A3", dims: "30 × 42 cm", price: 70 },
      { label: "A2", dims: "42 × 59 cm", price: 90 },
    ],
  },
  {
    id: "forgot",
    title: "She Forgot I Was There",
    meta: "Portrait · 2023",
    story:
      "She let me in on a Tuesday and we didn't speak for an hour. I don't fix anyone's hair. I just wait until they forget I'm there — which she did, right about here.",
    src: "/photos/collabs/DSC03378.jpg",
    w: 2000,
    h: 3000,
    paper: "Archival matte fine-art, 270gsm · giclée",
    sizes: [
      { label: "A4", dims: "21 × 30 cm", price: 50 },
      { label: "A3", dims: "30 × 42 cm", price: 70 },
      { label: "A2", dims: "42 × 59 cm", price: 90 },
    ],
  },
  {
    id: "coast",
    title: "The Coast Said Yes",
    meta: "Mediterranean · 2024",
    story:
      "I asked the sea for ten minutes and it gave me one. Most of what I remember about this day I've since improved. The light, at least, was real.",
    src: "/photos/fieldwork/DSC07527.jpg",
    w: 1000,
    h: 1500,
    paper: "Archival matte fine-art, 270gsm · giclée",
    sizes: [
      { label: "A4", dims: "21 × 30 cm", price: 50 },
      { label: "A3", dims: "30 × 42 cm", price: 70 },
      { label: "A2", dims: "42 × 59 cm", price: 90 },
    ],
  },
];

export function getPrint(id: string): Print | undefined {
  return prints.find((p) => p.id === id);
}

export function fromPrice(p: Print): number {
  return Math.min(...p.sizes.map((s) => s.price));
}

// Prodigi product SKUs per size, for automated fulfilment. Fill these from your
// Prodigi catalogue for the chosen paper (e.g. Hahnemühle Photo Rag). The
// "TODO_" values are placeholders — the webhook refuses to order until they're real.
export const PRODIGI_SKU_BY_SIZE: Record<string, string> = {
  A4: "TODO_PRODIGI_SKU_A4",
  A3: "TODO_PRODIGI_SKU_A3",
  A2: "TODO_PRODIGI_SKU_A2",
};

export function prodigiSkuFor(sizeLabel: string): string | undefined {
  return PRODIGI_SKU_BY_SIZE[sizeLabel];
}
