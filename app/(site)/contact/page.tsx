import Image from "next/image";
import { contactHero } from "@/lib/photos";

export const metadata = { title: "Contact — Ninja Photographer" };

export default function ContactPage() {
  return (
    <div className="relative flex-1 min-h-0 w-full overflow-hidden">
      <Image
        src={contactHero.src}
        alt={contactHero.alt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* dark scrim so the white text stays readable over a bright image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
        <div className="max-w-md text-white leading-relaxed [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          <p className="font-semibold text-[16px] mb-3">
            I photograph people doing what they love.
          </p>
          <p className="text-[14px] text-white/90 mb-2">
            My work celebrates the beauty of dedication and the intimate moments
            of creativity.
          </p>
          <p className="text-[14px] text-white/90 mb-6">
            I specialize in photographing people engaged in their passions,
            documenting their processes.
          </p>
          <a
            href="https://tally.so/r/3x9O6G"
            target="_blank"
            rel="noreferrer"
            className="text-[14px] text-white underline underline-offset-4 hover:text-white/70"
          >
            → Ready to tell your story?
          </a>
        </div>
      </div>
    </div>
  );
}
