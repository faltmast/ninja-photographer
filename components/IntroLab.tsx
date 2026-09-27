"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Caveat } from "next/font/google";

const hand = Caveat({ subsets: ["latin"], weight: "500" });

// Effects that stack on top of each other.
type Effects = {
  tilt: boolean;
  glare: boolean;
  shadow: boolean;
  border: boolean;
  gyro: boolean;
  develop: boolean;
};
const EFFECTS: [keyof Effects, string][] = [
  ["tilt", "Tilt"],
  ["glare", "1 · Glare"],
  ["shadow", "2 · Shadow"],
  ["border", "3 · Print border"],
  ["gyro", "4 · Phone motion"],
  ["develop", "10 · Develop"],
];

// Interactions that exclude each other.
type Mode = "none" | "flip" | "stack" | "drag" | "loupe" | "zoom";
const MODES: [Mode, string][] = [
  ["none", "Click = enter"],
  ["flip", "5 · Flip"],
  ["stack", "6 · Stack"],
  ["drag", "7 · Drag & flick"],
  ["loupe", "8 · Loupe"],
  ["zoom", "9 · Scroll zoom"],
];

const HERO = "/intro/intro.jpg";
const STACK = [
  HERO,
  "/photos/fieldwork/DSC00772.jpg",
  "/photos/fieldwork/DSC03064.jpg",
  "/photos/fieldwork/DSC06545.jpg",
  "/photos/fieldwork/DSC01526.jpg",
];
const STACK_ROT = [0, -4, 3, -2, 5];
const MAX_TILT = 8; // degrees
const LOUPE = 170; // px
const ZOOM = 2.4;

export function IntroLab() {
  const router = useRouter();
  const [fx, setFx] = useState<Effects>({
    tilt: true,
    glare: true,
    shadow: true,
    border: true,
    gyro: true,
    develop: true,
  });
  const [mode, setMode] = useState<Mode>("none");

  const [tilt, setTilt] = useState({ x: 0, y: 0 }); // degrees
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 }); // 0..1 inside the print
  const [inside, setInside] = useState(false);
  const [cardW, setCardW] = useState(400);
  const [developed, setDeveloped] = useState(!fx.develop);
  const [flipped, setFlipped] = useState(false);
  const [order, setOrder] = useState(STACK.map((_, i) => i));
  const [flying, setFlying] = useState<number | null>(null);
  const [drag, setDrag] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const [zoom, setZoom] = useState(0); // 0..1 scroll progress
  const [needsMotionPermission, setNeedsMotionPermission] = useState(false);

  const card = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, moved: false });

  // 10 · Develop: reveal on first load; toggling it on replays it (see toggle()).
  useEffect(() => {
    const t = setTimeout(() => setDeveloped(true), 80);
    return () => clearTimeout(t);
  }, []);

  function toggle(k: keyof Effects) {
    const on = !fx[k];
    setFx((f) => ({ ...f, [k]: on }));
    if (k === "develop" && on) {
      setDeveloped(false);
      setTimeout(() => setDeveloped(true), 80);
    }
  }

  // 4 · Phone motion: tilt from the gyroscope. iOS needs a permission tap first.
  useEffect(() => {
    if (!fx.gyro || typeof window === "undefined") return;
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    const ask = setTimeout(() => setNeedsMotionPermission(!!DOE?.requestPermission), 0);
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      const x = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      const y = Math.max(-1, Math.min(1, e.gamma / 30));
      setTilt({ x: -x * MAX_TILT, y: y * MAX_TILT });
      setPointer({ x: 0.5 + y / 2, y: 0.5 + x / 2 });
    };
    window.addEventListener("deviceorientation", onOrient);
    return () => {
      clearTimeout(ask);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, [fx.gyro]);

  async function askMotion() {
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    try {
      if ((await DOE.requestPermission?.()) === "granted") setNeedsMotionPermission(false);
    } catch {}
  }

  function localPoint(e: React.PointerEvent) {
    const r = card.current!.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!card.current) return;
    if (drag.active) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 6) dragStart.current.moved = true;
      setDrag({ x: dx, y: dy, active: true });
      setTilt({ x: -dy / 25, y: dx / 25 });
      return;
    }
    const p = localPoint(e);
    setPointer(p);
    setCardW(card.current.offsetWidth);
    if (fx.tilt && e.pointerType === "mouse") {
      setTilt({ x: -(p.y - 0.5) * MAX_TILT * 2, y: (p.x - 0.5) * MAX_TILT * 2 });
    }
  }

  function onPointerLeave() {
    setInside(false);
    if (!drag.active) setTilt({ x: 0, y: 0 });
  }

  function onPointerDown(e: React.PointerEvent) {
    if (mode !== "drag") return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragStart.current = { x: e.clientX, y: e.clientY, moved: false };
    setDrag({ x: 0, y: 0, active: true });
  }

  function onPointerUp() {
    if (mode !== "drag" || !drag.active) return;
    setDrag({ x: 0, y: 0, active: false }); // springs back via the transition
    setTilt({ x: 0, y: 0 });
  }

  function onClick() {
    if (mode === "flip") return setFlipped((f) => !f);
    if (mode === "stack") {
      if (flying !== null) return;
      const top = order[0];
      setFlying(top);
      setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setFlying(null);
      }, 450);
      return;
    }
    if (mode === "drag" && dragStart.current.moved) return;
    router.push("/fieldwork");
  }

  const cardTransform = [
    `translate(${drag.x}px, ${drag.y}px)`,
    fx.tilt || fx.gyro || drag.active ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : "",
    mode === "flip" && flipped ? "rotateY(180deg)" : "",
    mode === "zoom" ? `scale(${1 + zoom * (ZOOM - 1)})` : "",
  ].join(" ");

  const shadow = fx.shadow
    ? `${-tilt.y * 2.5}px ${18 + tilt.x * 2.5}px 40px rgba(0,0,0,${0.28 + Math.abs(tilt.x + tilt.y) * 0.01}), 0 2px 6px rgba(0,0,0,0.12)`
    : "none";

  const developStyle: React.CSSProperties = fx.develop
    ? {
        opacity: developed ? 1 : 0,
        filter: developed ? "none" : "brightness(2.6) contrast(0.35) blur(2px)",
        transition: "opacity 2.4s ease-out, filter 3.2s ease-out",
      }
    : {};

  // One print face: photo + optional border + glare.
  function face(src: string, priority?: boolean) {
    return (
      <div className={`absolute inset-0 ${fx.border ? "bg-[#fbfaf7] p-[4%] pb-[12%]" : ""}`}>
        <div className="relative w-full h-full overflow-hidden">
          <Image src={src} alt="Ninja Photographer" fill sizes="440px" className="object-cover" style={developStyle} priority={priority} />
        </div>
        {fx.glare && (
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(255,255,255,0.35), rgba(255,255,255,0) 45%)`,
              mixBlendMode: "soft-light",
              opacity: inside || fx.gyro || drag.active ? 1 : 0,
              transition: "opacity 300ms",
            }}
          />
        )}
      </div>
    );
  }

  const frameClass = "relative w-full aspect-[9/16]";

  const print =
    mode === "stack" ? (
      <div className={frameClass}>
        {[...order].reverse().map((idx) => {
          const depth = order.indexOf(idx);
          const isTop = depth === 0;
          const gone = flying === idx;
          return (
            <div
              key={idx}
              ref={isTop ? card : undefined}
              onClick={isTop ? onClick : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerEnter={isTop ? () => setInside(true) : undefined}
              onPointerLeave={isTop ? onPointerLeave : undefined}
              className="absolute inset-0 cursor-pointer"
              style={{
                transform: gone
                  ? "translate(130%, -10%) rotate(24deg)"
                  : `${isTop ? cardTransform : ""} rotate(${STACK_ROT[idx]}deg) translateY(${depth * 3}px)`,
                transition: gone ? "transform 450ms ease-in" : "transform 250ms ease-out",
                boxShadow: shadow,
                zIndex: STACK.length - depth,
              }}
            >
              {face(STACK[idx], idx === 0)}
            </div>
          );
        })}
      </div>
    ) : (
      <div
        ref={card}
        onClick={onClick}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setInside(true)}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className={`${frameClass} ${mode === "drag" ? "cursor-grab active:cursor-grabbing touch-none" : mode === "loupe" ? "cursor-none" : "cursor-pointer"} motion-reduce:!transform-none`}
        style={{
          transform: cardTransform,
          transformStyle: "preserve-3d",
          transition: drag.active ? "none" : mode === "flip" ? "transform 700ms cubic-bezier(.2,.8,.2,1)" : "transform 220ms ease-out",
          boxShadow: shadow,
        }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          {face(HERO, true)}
        </div>

        {mode === "flip" && (
          <div
            className="absolute inset-0 bg-[#f4f1ea] flex flex-col items-center justify-center gap-4 p-8 text-center text-[#2a2a2a]"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          >
            <p className={`${hand.className} text-[34px] leading-tight`}>Japan, 2024</p>
            <p className={`${hand.className} text-[22px] leading-snug opacity-80`}>
              I photograph people
              <br />
              doing what they love.
            </p>
            <Link href="/fieldwork" onClick={(e) => e.stopPropagation()} className={`${hand.className} text-[28px] underline underline-offset-4 mt-4`}>
              Enter Portfolio →
            </Link>
          </div>
        )}

        {mode === "loupe" && inside && (
          <span
            aria-hidden
            className="absolute pointer-events-none rounded-full border-2 border-white shadow-lg"
            style={{
              width: LOUPE,
              height: LOUPE,
              left: `calc(${pointer.x * 100}% - ${LOUPE / 2}px)`,
              top: `calc(${pointer.y * 100}% - ${LOUPE / 2}px)`,
              backgroundImage: `url(${HERO})`,
              backgroundSize: `${cardW * 2.5}px auto`,
              backgroundPosition: `${pointer.x * 100}% ${pointer.y * 100}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>
    );

  const controls = (
    <div className="fixed top-2 inset-x-0 z-20 flex flex-col items-center gap-1.5 px-3 text-[11px]">
      <div className="flex flex-wrap justify-center gap-1.5">
        {EFFECTS.map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => toggle(k)}
            className={`px-2.5 py-1 border transition-colors ${
              fx[k] ? "border-foreground bg-foreground text-background" : "border-black/20 bg-white text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {MODES.map(([m, label]) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setFlipped(false);
              setZoom(0);
            }}
            className={`px-2.5 py-1 border rounded-full transition-colors ${
              mode === m ? "border-accent bg-accent text-white" : "border-black/20 bg-white text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {fx.gyro && needsMotionPermission && (
        <button type="button" onClick={askMotion} className="px-2.5 py-1 border border-accent text-accent bg-white">
          Tap to enable phone motion
        </button>
      )}
    </div>
  );

  if (mode === "zoom") {
    return (
      <div
        className="h-full w-full overflow-y-auto bg-white"
        onScroll={(e) => {
          const el = e.currentTarget;
          setZoom(Math.min(1, el.scrollTop / (el.scrollHeight - el.clientHeight)));
        }}
      >
        {controls}
        <div style={{ height: "300vh" }}>
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8 p-6 overflow-hidden">
            <div className="w-full max-w-[440px]" style={{ perspective: "1000px" }}>
              {print}
            </div>
            <p className="text-[13px] text-muted" style={{ opacity: 1 - zoom * 3 }}>
              ↓ scroll
            </p>
            {zoom > 0.9 && (
              <Link href="/fieldwork" className="absolute bottom-10 text-[22px] text-white bg-black/60 px-5 py-2">
                → Enter Portfolio
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white flex flex-col items-center justify-center gap-8 p-6 md:p-10 pt-24">
      {controls}
      <div className="w-full max-w-[400px]" style={{ perspective: "1000px" }}>
        {print}
      </div>
      <Link href="/fieldwork" className="text-[20px] text-foreground hover:underline">
        → Enter Portfolio
      </Link>
    </div>
  );
}
