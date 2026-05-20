import Image from "next/image";
import { contactHero } from "@/lib/photos";

export const metadata = { title: "Contact — Ninja Photographer" };

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col items-center px-6 md:px-10 py-6">
      <div className="w-full max-w-4xl">
        <div
          className="relative w-full bg-black/[0.02]"
          style={{ aspectRatio: `${contactHero.w / contactHero.h}` }}
        >
          <Image
            src={contactHero.src}
            alt={contactHero.alt}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-md mt-12 mx-auto text-[14px] leading-relaxed">
          <p className="font-semibold mb-3">
            I photograph people doing what they love.
          </p>
          <p className="mb-2">
            My work celebrates the beauty of dedication and the intimate moments
            of creativity.
          </p>
          <p className="mb-6">
            I specialize in photographing people engaged in their passions,
            documenting their processes.
          </p>
          <a
            href="https://tally.so/r/3x9O6G"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            → Ready to tell your story?
          </a>
        </div>
      </div>
    </div>
  );
}
