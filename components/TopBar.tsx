"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartLink } from "@/components/CartLink";
import { series } from "@/lib/series";
import { SHOP_OPEN } from "@/lib/shop";

const nav = [
  { href: "/fieldwork", label: "Fieldwork" },
  { href: "/collabs", label: "Collabs" },
  // Hidden until lib/series.ts has at least one project.
  ...(series.length > 0 ? [{ href: "/series", label: "Series" }] : []),
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

// Pages whose image runs behind the top bar. There the bar is see-through with white text.
function isOverImage(pathname: string) {
  if (pathname === "/contact") return true;
  return pathname === "/shop" && !SHOP_OPEN;
}

function Instagram({ className }: { className: string }) {
  return (
    <a
      href="https://www.instagram.com/faltmast/"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram"
      className={`transition-colors ${className}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    </a>
  );
}

export function TopBar() {
  const overImage = isOverImage(usePathname());
  const logo = overImage ? "text-white" : "text-foreground";
  const link = overImage ? "text-white/85 hover:text-white" : "text-muted hover:text-foreground";
  return (
    // Phone: logo and Instagram on one line, menu underneath. Desktop: one row.
    <header
      className={`w-full px-6 md:px-10 py-4 md:py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 ${
        overImage ? "absolute inset-x-0 top-0 z-10" : ""
      }`}
    >
      <div className="w-full md:w-auto flex items-center justify-between">
        <Link href="/" className={`text-title font-normal whitespace-nowrap ${logo}`}>
          Ninja Photographer
        </Link>
        <Instagram className={`md:hidden ${link}`} />
      </div>
      <nav className="w-full md:w-auto flex items-center justify-between md:justify-start md:gap-8 text-body">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors ${link}`}
          >
            {item.label}
          </Link>
        ))}
        <CartLink />
        <Instagram className={`hidden md:block ${link}`} />
      </nav>
    </header>
  );
}
