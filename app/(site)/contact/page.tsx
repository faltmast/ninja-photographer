import Image from "next/image";
import { contactHero } from "@/lib/photos";
import { SELLER } from "@/lib/legal";

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

      {/* dark scrim so the white text and the white menu stay readable over a bright image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-14">
        <div className="max-w-3xl text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          <h1 className="text-display mb-5 md:mb-6">
            I photograph people doing what they love.
          </h1>
          <p className="text-lead text-white/90 mb-2 max-w-2xl">
            My work celebrates the beauty of dedication and the intimate moments
            of creativity.
          </p>
          <p className="text-lead text-white/90 mb-6 md:mb-8 max-w-2xl">
            I specialize in photographing people engaged in their passions,
            documenting their processes.
          </p>
          <a
            href="https://tally.so/r/3x9O6G"
            target="_blank"
            rel="noreferrer"
            className="text-lead text-white underline underline-offset-4 hover:text-white/70"
          >
            → Ready to tell your story?
          </a>
          <p className="text-body text-white/90 mt-3">
            Or write to{" "}
            <a
              href={`mailto:${SELLER.email}`}
              className="text-white underline underline-offset-4 hover:text-white/70"
            >
              {SELLER.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
