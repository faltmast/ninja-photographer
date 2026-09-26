import { Legal } from "@/components/Legal";
import { LEGAL_UPDATED, SELLER } from "@/lib/legal";

export const metadata = { title: "Legal Notice — Ninja Photographer" };

export default function LegalNoticePage() {
  return (
    <Legal title="Legal Notice (Impressum)" updated={LEGAL_UPDATED}>
      <h2>Information pursuant to § 5 DDG</h2>
      <p>
        {SELLER.name}
        <br />
        Ninja Photographer
        <br />
        {SELLER.street}
        <br />
        {SELLER.city}
        <br />
        {SELLER.country}
      </p>

      <h2>Contact</h2>
      <p>
        Phone: {SELLER.phone}
        <br />
        Email: <a href={`mailto:${SELLER.email}`}>{SELLER.email}</a>
      </p>

      <h2>VAT</h2>
      <p>
        As a small business owner within the meaning of § 19 UStG (German VAT Act), no
        VAT is charged or shown.
      </p>

      <h2>Responsible for content pursuant to § 18 (2) MStV</h2>
      <p>{SELLER.name}, address as above.</p>

      <h2>Consumer dispute resolution</h2>
      <p>
        We are neither willing nor obliged to participate in dispute resolution
        proceedings before a consumer arbitration board.
      </p>
    </Legal>
  );
}
