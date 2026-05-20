import Image from "next/image";
import type { Photo } from "@/lib/photos";

export function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <section className="flex-1 px-2 md:px-3 pb-3">
      <div
        className="flex flex-col md:flex-row gap-2 md:gap-3 md:h-[calc(100vh-7.5rem)]
                   md:overflow-x-auto md:overflow-y-hidden"
      >
        {photos.map((photo) => {
          const aspect = photo.w / photo.h;
          return (
            <div
              key={photo.id}
              className="relative bg-black/[0.02] md:h-full w-full md:w-auto md:shrink-0"
              style={{ aspectRatio: `${aspect}` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={photos.indexOf(photo) === 0}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
