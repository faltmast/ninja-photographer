import { SeriesIndex } from "@/components/SeriesIndex";
import { series } from "@/lib/series";

export const metadata = { title: "Series — Ninja Photographer" };

export default function SeriesPage() {
  return <SeriesIndex series={series} />;
}
