export type Photo = {
  id: string;
  src: string;
  alt: string;
  w: number;
  h: number;
};

const FIELDWORK: Photo[] = [
  { id: "DSC08391", src: "/photos/fieldwork/DSC08391.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC00917", src: "/photos/fieldwork/DSC00917.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC06941", src: "/photos/fieldwork/DSC06941.jpg", alt: "", w: 2000, h: 3000 },
  { id: "DSC00952", src: "/photos/fieldwork/DSC00952.jpg", alt: "", w: 1000, h: 667 },
  { id: "_20_01237", src: "/photos/fieldwork/_20_01237.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC_7839", src: "/photos/fieldwork/DSC_7839.jpg", alt: "", w: 2000, h: 1335 },
  { id: "DSC00772", src: "/photos/fieldwork/DSC00772.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC01482", src: "/photos/fieldwork/DSC01482.jpg", alt: "", w: 1000, h: 667 },
  { id: "DSC03515", src: "/photos/fieldwork/DSC03515.jpg", alt: "", w: 1000, h: 667 },
  { id: "DSC01526", src: "/photos/fieldwork/DSC01526.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC01633", src: "/photos/fieldwork/DSC01633.jpg", alt: "", w: 2000, h: 3000 },
  { id: "DSC01881", src: "/photos/fieldwork/DSC01881.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC02270", src: "/photos/fieldwork/DSC02270.jpg", alt: "", w: 1000, h: 667 },
  { id: "DSC02792", src: "/photos/fieldwork/DSC02792.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC02807-Enhanced-NR", src: "/photos/fieldwork/DSC02807-Enhanced-NR.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC03064", src: "/photos/fieldwork/DSC03064.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC04458", src: "/photos/fieldwork/DSC04458.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC06545", src: "/photos/fieldwork/DSC06545.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC06843", src: "/photos/fieldwork/DSC06843.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC07018", src: "/photos/fieldwork/DSC07018.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC07527", src: "/photos/fieldwork/DSC07527.jpg", alt: "", w: 1000, h: 1500 },
  { id: "DSC07868", src: "/photos/fieldwork/DSC07868.jpg", alt: "", w: 2000, h: 3000 },
  { id: "DSC09608", src: "/photos/fieldwork/DSC09608.jpg", alt: "", w: 1000, h: 1500 },
];

// Order matches the original ninja-photographer.com/collabs (verified 2026-07-18).
const COLLABS: Photo[] = [
  { id: "DSC00173", src: "/photos/collabs/DSC00173.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC04482", src: "/photos/collabs/DSC04482.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC09185", src: "/photos/collabs/DSC09185.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC01011", src: "/photos/collabs/DSC01011.jpg", alt: "", w: 599, h: 899 },
  { id: "DSC08524", src: "/photos/collabs/DSC08524.jpg", alt: "", w: 999, h: 666 },
  { id: "DSC02120", src: "/photos/collabs/DSC02120.jpg", alt: "", w: 1349, h: 899 },
  { id: "DSC00495", src: "/photos/collabs/DSC00495.jpg", alt: "", w: 599, h: 899 },
  { id: "DSC00072", src: "/photos/collabs/DSC00072.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC03329-2", src: "/photos/collabs/DSC03329-2.jpg", alt: "", w: 599, h: 899 },
  { id: "DSC04208", src: "/photos/collabs/DSC04208.jpg", alt: "", w: 599, h: 899 },
  { id: "DSC06745", src: "/photos/collabs/DSC06745.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC01364", src: "/photos/collabs/DSC01364.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC01959", src: "/photos/collabs/DSC01959.jpg", alt: "", w: 599, h: 899 },
  { id: "DSC02316-2", src: "/photos/collabs/DSC02316-2.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC03523", src: "/photos/collabs/DSC03523.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC02750", src: "/photos/collabs/DSC02750.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC05402", src: "/photos/collabs/DSC05402.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC03378", src: "/photos/collabs/DSC03378.jpg", alt: "", w: 599, h: 899 },
  { id: "DSC05094", src: "/photos/collabs/DSC05094.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC05912", src: "/photos/collabs/DSC05912.jpg", alt: "", w: 600, h: 899 },
  { id: "DSC07760", src: "/photos/collabs/DSC07760.jpg", alt: "", w: 600, h: 899 },
];

const CONTACT_HERO: Photo = {
  id: "DSC00293",
  src: "/photos/contact/DSC00293.jpg",
  alt: "Photographer at work in a sunlit room",
  w: 2000,
  h: 1333,
};

export const galleries = {
  fieldwork: FIELDWORK,
  collabs: COLLABS,
};

export const contactHero = CONTACT_HERO;