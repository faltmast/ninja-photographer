import { Legal } from "@/components/Legal";
import { LEGAL_UPDATED } from "@/lib/legal";
import { LegalNoticeBody, PrivacyBody, TermsBody, WithdrawalBody } from "@/components/LegalSections";

export const metadata = { title: "Legal / Impressum — Ninja Photographer" };

const SECTIONS = [
  { id: "legal-notice", title: "Legal Notice (Impressum)", Body: LegalNoticeBody },
  { id: "privacy", title: "Privacy Policy", Body: PrivacyBody },
  { id: "terms", title: "Terms and Conditions", Body: TermsBody },
  { id: "withdrawal", title: "Withdrawal Policy", Body: WithdrawalBody },
];

// All legal texts on one page, reached from a single footer link.
export default function LegalPage() {
  return (
    <Legal title="Legal / Impressum" updated={LEGAL_UPDATED}>
      <nav className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] not-prose">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.title}
          </a>
        ))}
      </nav>
      {SECTIONS.map(({ id, title, Body }) => (
        <section key={id} id={id} className="scroll-mt-6 pt-10">
          <h1 className="text-[22px] text-foreground">{title}</h1>
          <Body />
        </section>
      ))}
    </Legal>
  );
}
