import { Legal } from "@/components/Legal";

export const metadata = { title: "Widerrufsbelehrung — Ninja Photographer" };

export default function WiderrufPage() {
  return (
    <Legal title="Widerrufsbelehrung">
      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag
        zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder
        ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz
        genommen haben.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ([Voller Name], [Anschrift],
        [E-Mail-Adresse]) mittels einer eindeutigen Erklärung (z. B. ein mit der Post
        versandter Brief oder eine E-Mail) über Ihren Entschluss informieren. Sie können
        dafür das untenstehende Muster-Widerrufsformular verwenden, das jedoch nicht
        vorgeschrieben ist.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von
        Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme zusätzlicher
        Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von
        uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und
        spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung
        über Ihren Widerruf bei uns eingegangen ist. Sie tragen die unmittelbaren Kosten
        der Rücksendung der Waren. Für einen etwaigen Wertverlust der Waren müssen Sie nur
        aufkommen, wenn dieser Wertverlust auf einen zur Prüfung nicht notwendigen Umgang
        mit ihnen zurückzuführen ist.
      </p>

      <h2>Ausschluss des Widerrufsrechts</h2>
      <p>
        Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht
        vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder
        Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die
        persönlichen Bedürfnisse zugeschnitten sind (§ 312g Abs. 2 Nr. 1 BGB). Bei
        individuell auf Bestellung gefertigten/signierten Prints kann diese Ausnahme
        greifen. [Rechtlich prüfen lassen, ob für Ihre Editionen anwendbar.]
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        (Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und
        senden Sie es zurück.)
      </p>
      <ul>
        <li>An: [Voller Name], [Anschrift], [E-Mail-Adresse]</li>
        <li>
          Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den
          Kauf der folgenden Waren: ____________________
        </li>
        <li>Bestellt am / erhalten am: ____________________</li>
        <li>Name des/der Verbraucher(s): ____________________</li>
        <li>Anschrift des/der Verbraucher(s): ____________________</li>
        <li>Datum, Unterschrift (nur bei Mitteilung auf Papier): ____________________</li>
      </ul>
    </Legal>
  );
}
