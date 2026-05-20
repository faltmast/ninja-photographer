import { Gallery } from "@/components/Gallery";
import { galleries } from "@/lib/photos";

export const metadata = { title: "Fieldwork — Ninja Photographer" };

export default function FieldworkPage() {
  return <Gallery photos={galleries.fieldwork} />;
}
