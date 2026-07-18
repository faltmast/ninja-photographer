import { Legal } from "@/components/Legal";

export const metadata = { title: "Impressum — Ninja Photographer" };

export default function ImpressumPage() {
  return (
    <Legal title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        [Voller Name]
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ und Ort]
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: [Telefonnummer]
        <br />
        E-Mail: [E-Mail-Adresse]
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer berechnet
        und ausgewiesen.
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>[Voller Name], Anschrift wie oben.</p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
        bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben in diesem Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </Legal>
  );
}
