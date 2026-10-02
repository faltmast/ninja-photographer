import { notFound } from "next/navigation";
import { SeriesMenuLab } from "@/components/SeriesMenuLab";

// Preview only: five layouts for the Series menu. Not linked from the site.
export const metadata = { title: "Series menu previews", robots: { index: false } };

export function generateStaticParams() {
  return ["1", "2", "3", "4", "5"].map((v) => ({ v }));
}

export default async function SeriesLabPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  const n = Number(v);
  if (![1, 2, 3, 4, 5].includes(n)) notFound();
  return <SeriesMenuLab variant={n} />;
}
