"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MAX_TILT = 8; // degrees

// Landing print: tilts toward the mouse (desktop) or with the phone (gyroscope),
// with a soft shadow that moves against the tilt so the print floats over the page.
export function IntroPrint() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frame = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      const x = Math.max(-1, Math.min(1, (e.beta - 45) / 30)); // phone held at ~45°
      const y = Math.max(-1, Math.min(1, e.gamma / 30));
      setTilt({ x: -x * MAX_TILT, y: y * MAX_TILT });
    };
    window.addEventListener("deviceorientation", onOrient);

    // iOS only grants motion after a user gesture: ask on the first tap anywhere.
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    const ask = () => {
      DOE.requestPermission?.().catch(() => {});
    };
    if (DOE?.requestPermission) window.addEventListener("touchend", ask, { once: true });

    return () => {
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("touchend", ask);
    };
  }, []);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !frame.current) return;
    const r = frame.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * MAX_TILT * 2, y: px * MAX_TILT * 2 });
  }

  return (
    <div className="w-full max-w-[440px]" style={{ perspective: "1000px" }}>
      <Link
        ref={frame}
        href="/fieldwork"
        aria-label="Enter portfolio"
        onPointerMove={onMove}
        onPointerLeave={(e) => e.pointerType === "mouse" && setTilt({ x: 0, y: 0 })}
        className="relative block w-full aspect-[9/16] bg-black/[0.02] overflow-hidden motion-reduce:!transform-none"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 220ms ease-out, box-shadow 220ms ease-out",
          boxShadow: `${-tilt.y * 2.5}px ${18 + tilt.x * 2.5}px 40px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.12)`,
        }}
      >
        <Image
          src="/intro/intro.jpg"
          alt="Ninja Photographer"
          fill
          sizes="(max-width: 768px) 100vw, 440px"
          className="object-cover"
          priority
        />
      </Link>
    </div>
  );
}
