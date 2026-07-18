import Link from "next/link";

export const metadata = { title: "Order received — Ninja Photographer" };

export default function OrderComplete() {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center px-6 md:px-10 py-16 text-center">
      <div className="max-w-md flex flex-col gap-5">
        <p className="text-[11px] tracking-[0.18em] uppercase text-accent">Thank you</p>
        <h1 className="text-[28px] leading-tight text-foreground">
          Your print is being made.
        </h1>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          You&apos;ll get an email confirmation shortly. Your print is made to order on
          archival fine-art paper and sent straight to you. Give it a few days — these
          are printed properly, not rushed.
        </p>
        <Link
          href="/shop"
          className="text-[13px] text-accent hover:underline mt-2"
        >
          ← Back to the prints
        </Link>
      </div>
    </div>
  );
}
