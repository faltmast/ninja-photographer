import { Legal } from "@/components/Legal";
import { LEGAL_UPDATED, SELLER, SELLER_ADDRESS } from "@/lib/legal";

export const metadata = { title: "Datenschutzerklärung — Ninja Photographer" };

export default function DatenschutzPage() {
  return (
    <Legal title="Datenschutzerklärung" updated={LEGAL_UPDATED}>
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        {SELLER.name}, {SELLER_ADDRESS}, E-Mail: {SELLER.email}.
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
        USA gehostet. Beim Aufruf der Website werden technisch notwendige Daten (z. B.
        IP-Adresse, Zeitpunkt des Zugriffs) verarbeitet. Rechtsgrundlage ist unser
        berechtigtes Interesse am sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f
        DSGVO). Vercel ist nach dem EU-US Data Privacy Framework zertifiziert; die
        Übermittlung in die USA erfolgt auf Grundlage des Angemessenheitsbeschlusses der
        EU-Kommission (Art. 45 DSGVO).
      </p>

      <h2>3. Server-Logfiles</h2>
      <p>
        Der Provider erhebt und speichert automatisch Informationen in Server-Logfiles
        (Browsertyp, Betriebssystem, Referrer-URL, Hostname, Uhrzeit). Diese Daten sind
        nicht bestimmten Personen zuordenbar und werden zur Sicherstellung des Betriebs
        verarbeitet.
      </p>

      <h2>4. Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung der
        Anfrage gespeichert (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Für Anfragen über das
        Formular auf der Kontaktseite nutzen wir Tally (Tally BV, Belgien); die Angaben
        werden dort zur Bearbeitung Ihrer Anfrage gespeichert.
      </p>

      <h2>5. Bestellung &amp; Zahlungsabwicklung</h2>
      <p>
        Zur Abwicklung von Bestellungen verarbeiten wir die von Ihnen angegebenen Daten
        (Name, Liefer- und Rechnungsadresse, E-Mail). Die Zahlungsabwicklung erfolgt über
        Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Dublin 2, Irland; dabei
        werden die für die Zahlung erforderlichen Daten an Stripe übermittelt.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
      </p>

      <h2>6. Druck und Versand</h2>
      <p>
        Zur Herstellung und Lieferung Ihrer Bestellung geben wir Name, Lieferadresse und
        bestellten Artikel an das beauftragte Druck- und Versandunternehmen sowie den
        Versanddienstleister weiter, soweit dies für die Lieferung erforderlich ist
        (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <h2>7. Cookies</h2>
      <p>
        Diese Website verwendet nur technisch notwendige Cookies. Nicht notwendige Cookies
        oder Analyse-/Tracking-Dienste werden nur mit Ihrer Einwilligung eingesetzt
        (Art. 6 Abs. 1 lit. a DSGVO).
      </p>

      <h2>8. Speicherdauer</h2>
      <p>
        Bestelldaten speichern wir, solange gesetzliche Aufbewahrungspflichten bestehen
        (in der Regel bis zu 10 Jahre nach § 147 AO). Anfragen löschen wir, sobald sie
        erledigt sind.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>Sie haben das Recht auf:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
      </ul>

      <h2>10. Beschwerderecht</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
        Zuständig für uns ist die Landesbeauftragte für den Datenschutz Niedersachsen,
        Prinzenstraße 5, 30159 Hannover.
      </p>
    </Legal>
  );
}
