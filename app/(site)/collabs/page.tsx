import { Gallery } from "@/components/Gallery";
import { galleries } from "@/lib/photos";

export const metadata = { title: "Collabs — Ninja Photographer" };

export default function CollabsPage() {
  return <Gallery photos={galleries.collabs} />;
}
