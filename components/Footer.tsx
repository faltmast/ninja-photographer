import Link from "next/link";

const legal = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
];

export function Footer() {
  return (
    <footer className="w-full px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[11px] text-muted">
      <span>© Alexis Papageorgiou</span>
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
        {legal.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
            {l.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
