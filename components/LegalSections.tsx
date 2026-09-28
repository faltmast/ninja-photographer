import { SELLER, SELLER_ADDRESS } from "@/lib/legal";

// Bodies of the four legal texts, rendered together on /legal.

export function LegalNoticeBody() {
  return (
    <>
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
    </>
  );
}

export function PrivacyBody() {
  return (
    <>
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
    </>
  );
}

export function TermsBody() {
  return (
    <>
      <h2>1. Scope, seller</h2>
      <p>
        These terms apply to all orders placed through this online shop. The seller is{" "}
        {SELLER.name}, {SELLER_ADDRESS}, email: {SELLER.email} (&ldquo;Seller&rdquo;). The
        offer is directed at consumers and businesses.
      </p>

      <h2>2. Conclusion of contract</h2>
      <p>
        The presentation of products in the shop is not a binding offer. You choose a
        print and size and proceed via &ldquo;Acquire&rdquo; to the checkout page of our
        payment provider Stripe, where you can review and correct your details. By
        clicking the pay button you submit a binding offer; the contract is concluded when
        payment is successfully completed. You will then receive a confirmation by email.
      </p>

      <h2>3. Contract language, contract text</h2>
      <p>
        The contract language is English. We do not store the contract text separately
        for you; your order details are sent to you in the confirmation email. You can
        view and print these terms on this page at any time.
      </p>

      <h2>4. Prices and shipping costs</h2>
      <p>
        All prices are final prices. As a small business owner under § 19 UStG (German VAT
        Act), we do not charge VAT. Any shipping costs are shown before you complete your
        order. For deliveries outside the EU, customs duties and import taxes may apply,
        which are borne by the buyer.
      </p>

      <h2>5. Payment</h2>
      <p>
        Payment is made using the methods offered at checkout. The purchase price is due
        upon conclusion of the contract.
      </p>

      <h2>6. Delivery</h2>
      <p>
        Delivery is made to the shipping address provided. Prints are made to order; the
        delivery time is stated at checkout or by email.
      </p>

      <h2>7. Retention of title</h2>
      <p>The goods remain our property until paid for in full.</p>

      <h2>8. Right of withdrawal</h2>
      <p>
        Consumers have a right of withdrawal as set out in the{" "}
        <a href="#withdrawal">withdrawal policy</a>.
      </p>

      <h2>9. Warranty</h2>
      <p>
        Statutory warranty rights apply. Please report any transport damage promptly; this
        helps us claim against the carrier. Your statutory rights remain unaffected.
      </p>

      <h2>10. Dispute resolution</h2>
      <p>
        We do not participate in dispute resolution proceedings before a consumer
        arbitration board.
      </p>

      <h2>11. Final provisions</h2>
      <p>
        The law of the Federal Republic of Germany applies, excluding the UN Convention on
        Contracts for the International Sale of Goods. For consumers, this choice of law
        applies only insofar as it does not deprive them of the protection of mandatory
        provisions of the law of the country in which they have their habitual residence.
        Should individual provisions be invalid, the validity of the remaining provisions
        remains unaffected.
      </p>
    </>
  );
}

export function WithdrawalBody() {
  return (
    <>
      <h2>Right of withdrawal</h2>
      <p>
        You have the right to withdraw from this contract within 14 days without giving
        any reason. The withdrawal period will expire after 14 days from the day on which
        you acquire, or a third party other than the carrier and indicated by you
        acquires, physical possession of the goods.
      </p>
      <p>
        To exercise the right of withdrawal, you must inform us ({SELLER.name},{" "}
        {SELLER_ADDRESS}, phone: {SELLER.phone}, email: {SELLER.email}) of your decision
        to withdraw from this contract by an unequivocal statement (e.g. a letter sent by
        post or email). You may use the attached model withdrawal form, but it is not
        obligatory.
      </p>
      <p>
        To meet the withdrawal deadline, it is sufficient for you to send your
        communication concerning your exercise of the right of withdrawal before the
        withdrawal period has expired.
      </p>

      <h2>Effects of withdrawal</h2>
      <p>
        If you withdraw from this contract, we shall reimburse to you all payments
        received from you, including the costs of delivery (with the exception of the
        supplementary costs resulting from your choice of a type of delivery other than
        the least expensive type of standard delivery offered by us), without undue delay
        and in any event not later than 14 days from the day on which we are informed
        about your decision to withdraw from this contract. We will carry out such
        reimbursement using the same means of payment as you used for the initial
        transaction, unless you have expressly agreed otherwise; in any event, you will
        not incur any fees as a result of such reimbursement.
      </p>
      <p>
        We may withhold reimbursement until we have received the goods back or you have
        supplied evidence of having sent back the goods, whichever is the earliest.
      </p>
      <p>
        You shall send back the goods or hand them over to us without undue delay and in
        any event not later than 14 days from the day on which you communicate your
        withdrawal from this contract to us. The deadline is met if you send back the
        goods before the period of 14 days has expired.
      </p>
      <p>You will have to bear the direct cost of returning the goods.</p>
      <p>
        You are only liable for any diminished value of the goods resulting from the
        handling other than what is necessary to establish the nature, characteristics
        and functioning of the goods.
      </p>

      <h2>Model withdrawal form</h2>
      <p>
        (Complete and return this form only if you wish to withdraw from the contract.)
      </p>
      <ul>
        <li>
          To: {SELLER.name}, {SELLER_ADDRESS}, email: {SELLER.email}
        </li>
        <li>
          I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract of
          sale of the following goods (*)/for the provision of the following service (*)
        </li>
        <li>Ordered on (*)/received on (*)</li>
        <li>Name of consumer(s)</li>
        <li>Address of consumer(s)</li>
        <li>Signature of consumer(s) (only if this form is notified on paper)</li>
        <li>Date</li>
      </ul>
      <p>(*) Delete as appropriate.</p>
    </>
  );
}
