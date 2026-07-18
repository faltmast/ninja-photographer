import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <TopBar />
      <main className="flex-1 flex flex-col min-h-0">{children}</main>
      <Footer />
    </div>
  );
}
