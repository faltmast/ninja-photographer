import Link from "next/link";

export function Legal({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1 min-h-0 overflow-y-auto px-6 md:px-10 py-8">
      <div className="max-w-[680px] mx-auto pb-16">
        <Link
          href="/"
          className="text-[13px] text-muted hover:text-foreground transition-colors"
        >
          ← Zurück
        </Link>
        <h1 className="text-[28px] text-foreground mt-4">{title}</h1>
        {updated && <p className="text-[12px] text-muted mt-1 mb-4">Stand: {updated}</p>}
        <div className="legal mt-6">{children}</div>
      </div>
    </section>
  );
}
