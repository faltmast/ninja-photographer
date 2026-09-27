import Link from "next/link";
import { IntroPrint } from "@/components/IntroPrint";

export const metadata = { title: "Ninja Photographer" };

export default function IntroPage() {
  return (
    <div className="h-full w-full bg-white flex flex-col items-center justify-center gap-8 p-6 md:p-10">
      <IntroPrint />
      <Link
        href="/fieldwork"
        className="text-[20px] text-foreground hover:underline"
      >
        → Enter Portfolio
      </Link>
    </div>
  );
}
