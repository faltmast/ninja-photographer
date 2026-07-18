import { Legal } from "@/components/Legal";

export const metadata = { title: "Datenschutzerklärung — Ninja Photographer" };

export default function DatenschutzPage() {
  return (
    <Legal title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        [Voller Name], [Anschrift], E-Mail: [E-Mail-Adresse].
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird bei [Hosting-Anbieter, z. B. Vercel Inc.] gehostet. Beim Aufruf
        der Website werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt des
        Zugriffs) verarbeitet. Rechtsgrundlage ist unser berechtigtes Interesse am sicheren
        Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).
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
        Anfrage gespeichert (Art. 6 Abs. 1 lit. b bzw. f DSGVO).
      </p>

      <h2>5. Bestellung &amp; Zahlungsabwicklung</h2>
      <p>
        Zur Abwicklung von Bestellungen verarbeiten wir die von Ihnen angegebenen Daten
        (Name, Liefer- und Rechnungsadresse, E-Mail). Die Zahlungsabwicklung erfolgt über
        [Zahlungsdienstleister, z. B. Stripe Payments Europe Ltd.]; dabei werden die für
        die Zahlung erforderlichen Daten an den Zahlungsdienstleister übermittelt.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
      </p>

      <h2>6. Versand</h2>
      <p>
        Zur Lieferung Ihrer Bestellung geben wir Ihre Adressdaten an das beauftragte
        Druck- und Versandunternehmen sowie den Versanddienstleister weiter, soweit dies
        für die Lieferung erforderlich ist.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Diese Website verwendet nur technisch notwendige Cookies. Nicht notwendige Cookies
        oder Analyse-/Tracking-Dienste werden nur mit Ihrer Einwilligung eingesetzt
        (Art. 6 Abs. 1 lit. a DSGVO).
      </p>

      <h2>8. Ihre Rechte</h2>
      <p>Sie haben das Recht auf:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
      </ul>

      <h2>9. Beschwerderecht</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren,
        z. B. der Berliner Beauftragten für Datenschutz und Informationsfreiheit.
      </p>
    </Legal>
  );
}
