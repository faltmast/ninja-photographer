import { Legal } from "@/components/Legal";
import { LEGAL_UPDATED, SELLER, SELLER_ADDRESS } from "@/lib/legal";

export const metadata = { title: "AGB — Ninja Photographer" };

export default function AGBPage() {
  return (
    <Legal title="Allgemeine Geschäftsbedingungen" updated={LEGAL_UPDATED}>
      <h2>§ 1 Geltungsbereich, Anbieter</h2>
      <p>
        Diese AGB gelten für alle Bestellungen über diesen Online-Shop. Anbieter ist{" "}
        {SELLER.name}, {SELLER_ADDRESS}, E-Mail: {SELLER.email} (nachfolgend
        „Verkäufer“). Das Angebot richtet sich an Verbraucher und Unternehmer.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Die Darstellung der Produkte im Shop stellt kein bindendes Angebot dar. Sie wählen
        Motiv und Format und gelangen über „Acquire“ zur Bezahlseite unseres
        Zahlungsdienstleisters Stripe. Dort können Sie Ihre Angaben prüfen und
        korrigieren. Mit Klick auf den Bezahl-Button geben Sie ein verbindliches Angebot
        ab; der Vertrag kommt mit erfolgreichem Abschluss der Zahlung zustande. Sie
        erhalten anschließend eine Bestätigung per E-Mail.
      </p>

      <h2>§ 3 Vertragssprache, Vertragstext</h2>
      <p>
        Vertragssprache ist Deutsch. Wir speichern den Vertragstext nicht gesondert für
        Sie; Ihre Bestelldaten erhalten Sie mit der Bestätigungs-E-Mail. Diese AGB können
        Sie jederzeit auf dieser Seite abrufen und ausdrucken.
      </p>

      <h2>§ 4 Preise und Versandkosten</h2>
      <p>
        Alle Preise sind Endpreise. Als Kleinunternehmer gemäß § 19 UStG weisen wir keine
        Umsatzsteuer aus. Etwaige Versandkosten werden vor Abschluss der Bestellung
        angezeigt. Bei Lieferungen außerhalb der EU können Zölle und Einfuhrabgaben
        anfallen, die der Käufer trägt.
      </p>

      <h2>§ 5 Zahlung</h2>
      <p>
        Die Zahlung erfolgt über die im Bestellprozess angebotenen Zahlungsarten. Der
        Kaufpreis ist mit Vertragsschluss zur Zahlung fällig.
      </p>

      <h2>§ 6 Lieferung</h2>
      <p>
        Die Lieferung erfolgt an die angegebene Lieferadresse. Prints werden auf Bestellung
        gefertigt; die Lieferzeit wird im Bestellprozess bzw. per E-Mail mitgeteilt.
      </p>

      <h2>§ 7 Eigentumsvorbehalt</h2>
      <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>

      <h2>§ 8 Widerrufsrecht</h2>
      <p>
        Verbrauchern steht ein Widerrufsrecht nach Maßgabe der{" "}
        <a href="/widerruf">Widerrufsbelehrung</a> zu.
      </p>

      <h2>§ 9 Mängelhaftung</h2>
      <p>
        Es gilt das gesetzliche Mängelhaftungsrecht. Bei Transportschäden bitten wir um
        zeitnahe Mitteilung; dies erleichtert die Geltendmachung gegenüber dem Transporteur.
        Ihre gesetzlichen Rechte bleiben davon unberührt.
      </p>

      <h2>§ 10 Streitbeilegung</h2>
      <p>
        Wir nehmen nicht an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teil.
      </p>

      <h2>§ 11 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
        Bei Verbrauchern gilt diese Rechtswahl nur, soweit dadurch nicht der Schutz durch
        zwingende Bestimmungen des Staates entzogen wird, in dem der Verbraucher seinen
        gewöhnlichen Aufenthalt hat. Sollten einzelne Bestimmungen unwirksam sein, bleibt
        die Wirksamkeit der übrigen unberührt.
      </p>
    </Legal>
  );
}
