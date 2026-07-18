import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Ninja Photographer" };

export default function IntroPage() {
  return (
    <div className="h-full w-full bg-white flex flex-col items-center justify-center gap-8 p-6 md:p-10">
      <div className="relative w-full max-w-[440px] aspect-[9/16] bg-black/[0.02]">
        <Image
          src="/intro/intro.jpg"
          alt="Ninja Photographer"
          fill
          sizes="(max-width: 768px) 100vw, 440px"
          className="object-cover"
          priority
        />
      </div>
      <Link
        href="/fieldwork"
        className="text-[20px] text-foreground hover:underline"
      >
        → Enter spreadsheet
      </Link>
    </div>
  );
}
