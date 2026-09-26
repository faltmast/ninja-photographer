import { Legal } from "@/components/Legal";
import { LEGAL_UPDATED, SELLER, SELLER_ADDRESS } from "@/lib/legal";

export const metadata = { title: "Privacy Policy — Ninja Photographer" };

export default function PrivacyPage() {
  return (
    <Legal title="Privacy Policy" updated={LEGAL_UPDATED}>
      <h2>1. Controller</h2>
      <p>
        The controller responsible for data processing on this website is:
        <br />
        {SELLER.name}, {SELLER_ADDRESS}, email: {SELLER.email}.
      </p>

      <h2>2. Hosting</h2>
      <p>
        This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
        USA. When you visit the website, technically necessary data (e.g. IP address, time
        of access) is processed. The legal basis is our legitimate interest in operating
        the website securely (Art. 6 (1) (f) GDPR). Vercel is certified under the EU-US
        Data Privacy Framework; transfers to the USA are based on the European
        Commission&apos;s adequacy decision (Art. 45 GDPR).
      </p>

      <h2>3. Server log files</h2>
      <p>
        The host automatically collects and stores information in server log files
        (browser type, operating system, referrer URL, host name, time). This data cannot
        be attributed to specific persons and is processed to keep the website running.
      </p>

      <h2>4. Contact</h2>
      <p>
        If you contact us by email, your details are stored to handle your enquiry
        (Art. 6 (1) (b) or (f) GDPR). Enquiries via the form on the contact page are
        handled by Tally (Tally BV, Belgium), where your details are stored to process
        your enquiry.
      </p>

      <h2>5. Orders &amp; payment</h2>
      <p>
        To process orders we use the data you provide (name, shipping and billing address,
        email). Payments are handled by Stripe Payments Europe Ltd., 1 Grand Canal Street
        Lower, Dublin 2, Ireland; the data required for payment is transmitted to Stripe.
        The legal basis is Art. 6 (1) (b) GDPR (performance of a contract).
      </p>

      <h2>6. Printing and shipping</h2>
      <p>
        To produce and deliver your order, we pass your name, shipping address and the
        ordered item to the print lab and the shipping carrier, to the extent necessary
        for delivery (Art. 6 (1) (b) GDPR).
      </p>

      <h2>7. Cookies</h2>
      <p>
        This website only uses technically necessary cookies. Non-essential cookies or
        analytics/tracking services are only used with your consent (Art. 6 (1) (a)
        GDPR).
      </p>

      <h2>8. Retention</h2>
      <p>
        Order data is kept for as long as statutory retention obligations apply (generally
        up to 10 years under § 147 AO). Enquiries are deleted once they have been dealt
        with.
      </p>

      <h2>9. Your rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>access (Art. 15 GDPR)</li>
        <li>rectification (Art. 16 GDPR)</li>
        <li>erasure (Art. 17 GDPR)</li>
        <li>restriction of processing (Art. 18 GDPR)</li>
        <li>data portability (Art. 20 GDPR)</li>
        <li>object (Art. 21 GDPR)</li>
      </ul>

      <h2>10. Right to lodge a complaint</h2>
      <p>
        You have the right to lodge a complaint with a data protection supervisory
        authority. The authority responsible for us is the Data Protection Commissioner of
        Lower Saxony (Die Landesbeauftragte für den Datenschutz Niedersachsen),
        Prinzenstraße 5, 30159 Hannover, Germany.
      </p>
    </Legal>
  );
}
