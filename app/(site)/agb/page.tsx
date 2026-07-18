import { Legal } from "@/components/Legal";

export const metadata = { title: "AGB — Ninja Photographer" };

export default function AGBPage() {
  return (
    <Legal title="Allgemeine Geschäftsbedingungen">
      <h2>§ 1 Geltungsbereich, Anbieter</h2>
      <p>
        Diese AGB gelten für alle Bestellungen über diesen Online-Shop. Anbieter ist
        [Voller Name], [Anschrift] (nachfolgend „Verkäufer“). Das Angebot richtet sich an
        Verbraucher und Unternehmer.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Die Darstellung der Produkte stellt kein bindendes Angebot dar. Mit dem Absenden
        der Bestellung geben Sie ein verbindliches Angebot ab. Der Vertrag kommt zustande,
        sobald wir die Annahme bzw. den Versand per E-Mail bestätigen.
      </p>

      <h2>§ 3 Preise und Versandkosten</h2>
      <p>
        Alle Preise sind Endpreise. Als Kleinunternehmer gemäß § 19 UStG weisen wir keine
        Umsatzsteuer aus. Zzgl. Versandkosten, die vor Abschluss der Bestellung angezeigt
        werden.
      </p>

      <h2>§ 4 Zahlung</h2>
      <p>
        Die Zahlung erfolgt über die im Bestellprozess angebotenen Zahlungsarten. Der
        Kaufpreis ist mit Vertragsschluss zur Zahlung fällig.
      </p>

      <h2>§ 5 Lieferung</h2>
      <p>
        Die Lieferung erfolgt an die angegebene Lieferadresse. Prints werden auf Bestellung
        gefertigt; die Lieferzeit wird im Bestellprozess bzw. per E-Mail mitgeteilt.
      </p>

      <h2>§ 6 Eigentumsvorbehalt</h2>
      <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>

      <h2>§ 7 Widerrufsrecht</h2>
      <p>
        Verbrauchern steht ein Widerrufsrecht nach Maßgabe der{" "}
        <a href="/widerruf">Widerrufsbelehrung</a> zu.
      </p>

      <h2>§ 8 Mängelhaftung</h2>
      <p>
        Es gilt das gesetzliche Mängelhaftungsrecht. Bei Transportschäden bitten wir um
        zeitnahe Mitteilung; dies erleichtert die Geltendmachung gegenüber dem Transporteur.
      </p>

      <h2>§ 9 Streitbeilegung</h2>
      <p>
        Plattform der EU zur Online-Streitbeilegung:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Wir nehmen nicht an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teil.
      </p>

      <h2>§ 10 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen
        unwirksam sein, bleibt die Wirksamkeit der übrigen unberührt.
      </p>
    </Legal>
  );
}
