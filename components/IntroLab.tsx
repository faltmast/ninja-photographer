"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Effects = { invert: boolean; grain: boolean; tilt: boolean };

const LABELS: Record<keyof Effects, string> = {
  invert: "1 · Invert on hover",
  grain: "6 · Film grain",
  tilt: "9 · Tilt",
};

const MAX_TILT = 6; // degrees

export function IntroLab() {
  const [fx, setFx] = useState<Effects>({ invert: true, grain: true, tilt: true });
  const [hover, setHover] = useState(false);
  const [tapped, setTapped] = useState(false); // touch: tap toggles the negative
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frame = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent) {
    if (!fx.tilt || !frame.current) return;
    const r = frame.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * MAX_TILT * 2, y: px * MAX_TILT * 2 });
  }

  function onLeave() {
    setHover(false);
    setTilt({ x: 0, y: 0 });
  }

  const inverted = fx.invert && (hover || tapped);

  return (
    <div className="h-full w-full bg-white flex flex-col items-center justify-center gap-8 p-6 md:p-10">
      {/* effect switches — lab only */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-10 flex flex-wrap justify-center gap-2 text-[12px]">
        {(Object.keys(LABELS) as (keyof Effects)[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFx((f) => ({ ...f, [k]: !f[k] }))}
            className={`px-3 py-1.5 border transition-colors ${
              fx[k] ? "border-foreground bg-foreground text-background" : "border-black/20 text-muted"
            }`}
          >
            {LABELS[k]}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[440px]" style={{ perspective: "1000px" }}>
        <Link
          ref={frame}
          href="/fieldwork"
          aria-label="Enter portfolio"
          onMouseEnter={() => setHover(true)}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onTouchStart={(e) => {
            // first tap shows the negative, second tap enters
            if (fx.invert && !tapped) {
              e.preventDefault();
              setTapped(true);
            }
          }}
          className="relative block w-full aspect-[9/16] bg-black/[0.02] overflow-hidden motion-reduce:!transform-none"
          style={{
            transform: fx.tilt ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : undefined,
            transition: "transform 200ms ease-out",
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/intro/intro.jpg"
            alt="Ninja Photographer"
            fill
            sizes="(max-width: 768px) 100vw, 440px"
            className="object-cover"
            style={{
              filter: inverted ? "invert(1)" : "none",
              transition: "filter 450ms ease",
            }}
            priority
          />
          {fx.grain && <span aria-hidden className="grain" />}
        </Link>
      </div>

      <Link href="/fieldwork" className="text-[20px] text-foreground hover:underline">
        → Enter Portfolio
      </Link>
    </div>
  );
}
