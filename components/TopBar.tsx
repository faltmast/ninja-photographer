import Link from "next/link";

const nav = [
  { href: "/fieldwork", label: "Fieldwork" },
  { href: "/collabs", label: "Collabs" },
  { href: "/contact", label: "Contact" },
];

export function TopBar() {
  return (
    <header className="w-full px-6 md:px-10 py-5 flex items-center justify-between text-[13px]">
      <Link href="/" className="font-normal tracking-tight text-foreground">
        Ninja Photographer
      </Link>
      <nav className="flex items-center gap-6">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-muted hover:text-foreground transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <a
          href="https://www.instagram.com/faltmast/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="text-muted hover:text-foreground transition-colors"
        >
          <svg
            width="16"
            height="16"
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
      </nav>
    </header>
  );
}
