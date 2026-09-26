import { Legal } from "@/components/Legal";
import { LEGAL_UPDATED, SELLER, SELLER_ADDRESS } from "@/lib/legal";

export const metadata = { title: "Terms — Ninja Photographer" };

export default function TermsPage() {
  return (
    <Legal title="Terms and Conditions" updated={LEGAL_UPDATED}>
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
        <a href="/withdrawal">withdrawal policy</a>.
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
    </Legal>
  );
}
