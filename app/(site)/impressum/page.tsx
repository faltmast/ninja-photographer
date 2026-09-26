import { Legal } from "@/components/Legal";
import { LEGAL_UPDATED, SELLER } from "@/lib/legal";

export const metadata = { title: "Impressum — Ninja Photographer" };

export default function ImpressumPage() {
  return (
    <Legal title="Impressum" updated={LEGAL_UPDATED}>
      <h2>Angaben gemäß § 5 DDG</h2>
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

      <h2>Kontakt</h2>
      <p>
        Telefon: {SELLER.phone}
        <br />
        E-Mail: <a href={`mailto:${SELLER.email}`}>{SELLER.email}</a>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer berechnet
        und ausgewiesen.
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>{SELLER.name}, Anschrift wie oben.</p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </Legal>
  );
}
