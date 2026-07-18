import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Subscription Agreement | Palm Bay Digital",
  description:
    "The plain-English terms for Palm Bay Digital's monthly website subscription: what's included, pricing, cancellation, domains and data protection.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://palmbay.digital/terms" },
};

/**
 * Published edition of the Website Subscription Agreement. The canonical
 * source is content/legal/website-subscription-agreement.md — update both
 * together and bump VERSION. Customers accept by replying YES to the
 * onboarding email, authorising the Direct Debit mandate, or paying the
 * first invoice (clause 1).
 */
const VERSION = "Version 1.0 — 18 July 2026";

const clauses: { title: string; paras: React.ReactNode[] }[] = [
  {
    title: "1. Who this is for, and how you accept it",
    paras: [
      <>
        This is a business-to-business agreement. By accepting it you confirm you are acting in
        the course of a business (as a sole trader, partnership or company), not as a consumer.
        You accept this agreement by whichever of these happens first: replying to our onboarding
        email to confirm acceptance; authorising a Direct Debit mandate that references this
        agreement; or paying our first invoice. The version and date above tell you which edition
        you accepted — we archive every version.
      </>,
    ],
  },
  {
    title: "2. What your subscription includes",
    paras: [
      <>For the monthly fee, we will:</>,
      <ul key="incl" className="list-disc space-y-1 pl-6">
        <li>build your website and put it live;</li>
        <li>host it, keep it online and keep its software up to date;</li>
        <li>register a domain name for you if you need one, or connect a domain you already own;</li>
        <li>provide an HTTPS (padlock) certificate;</li>
        <li>give you access to a content editor so you can change the text and photos yourself; and</li>
        <li>provide minor support: small fixes, and help using the editor, by email.</li>
      </ul>,
    ],
  },
  {
    title: "3. What's not included",
    paras: [
      <>
        New pages beyond the original build, redesigns, new features (such as booking systems or
        online payments), ongoing SEO or marketing campaigns, paid advertising management, writing
        new content for you, and email hosting are <strong>not</strong> included. We're happy to
        quote for any of these separately.
      </>,
    ],
  },
  {
    title: "4. Price and payment",
    paras: [
      <>
        The price is the monthly amount stated at signup (our standard price is £25 per month).
        You pay by Direct Debit, collected through GoCardless against our invoice, starting on or
        before the day your site goes live. We are not currently VAT registered, so no VAT is
        added; if we register for VAT in future we will give you at least 30 days' notice before
        VAT appears on your invoices.
      </>,
    ],
  },
  {
    title: "5. Price changes",
    paras: [
      <>
        We can change the monthly price by giving you at least 30 days' notice by email. If you
        don't want to pay the new price, you can cancel before it takes effect (clause 6) and
        you'll never pay more than the price you signed up at.
      </>,
    ],
  },
  {
    title: "6. How long it lasts, and cancelling",
    paras: [
      <>
        Your subscription runs month to month. Either of us can end it by giving 30 days' notice
        by email at any time. There is no minimum term and no cancellation fee.
      </>,
    ],
  },
  {
    title: "7. What happens when it ends",
    paras: [
      <>At the end of your notice period your website comes down. We will, free of charge and within 30 days:</>,
      <ul key="exit" className="list-disc space-y-1 pl-6">
        <li>give you a copy of your content — the text, images and any contact-form submissions we hold;</li>
        <li>transfer your domain to you or your new provider (clause 9); and</li>
        <li>export and hand over the data from your content editor.</li>
      </ul>,
      <>
        The website's code, design and underlying templates remain ours (clause 8), so the site
        itself does not transfer — but everything that is yours does.
      </>,
    ],
  },
  {
    title: "8. Who owns what",
    paras: [
      <>
        We own the website code, design system and templates, and we licence them to you for use
        in your website while you subscribe. You own your business name, logo, photos, text,
        reviews and anything else you supply or add through the editor, and you licence us to
        publish that content on your website. Neither of us gains ownership of the other's
        property through this agreement.
      </>,
    ],
  },
  {
    title: "9. Domain names",
    paras: [
      <>
        <strong>If we register a domain for you:</strong> it is registered for your benefit, you
        are entitled to be named as the registrant, and on cancellation we will transfer it to
        you (or your new provider) free of charge. We will never hold your domain hostage.
      </>,
      <>
        <strong>If you already own a domain:</strong> it stays entirely yours. We only need DNS
        access (or the specific records to be set) to point it at your website, and we'll hand
        back or undo that configuration on request.
      </>,
    ],
  },
  {
    title: "10. Your content — promises you make to us",
    paras: [
      <>
        You promise that you own, or have permission to use, everything you give us or publish
        through the editor — especially photographs — and that factual claims on your site
        (qualifications, accreditations such as Gas Safe or NICEIC, reviews, guarantees) are true
        and up to date. If a third party brings a claim against us because of content you
        supplied or published, you agree to cover our reasonable costs and losses from that claim.
      </>,
    ],
  },
  {
    title: "11. Acceptable use",
    paras: [
      <>
        Your site must not be used for anything unlawful, misleading or infringing. If we
        reasonably believe content on your site breaks the law or this agreement, we can take
        that content (or if necessary the site) down — we'll tell you first where practical, and
        work with you to put things right.
      </>,
    ],
  },
  {
    title: "12. Service levels — what we do and don't promise",
    paras: [
      <>
        We look after your site with reasonable skill and care and aim to keep it online at all
        times, but <strong>we do not guarantee uninterrupted availability</strong>. Your site
        runs on third-party infrastructure (hosting, content-management and domain providers),
        and their outages, as well as planned maintenance, can cause interruptions that are
        outside our control. We keep backups of your site content. If your site goes down, we'll
        work to restore it as quickly as we reasonably can.
      </>,
    ],
  },
  {
    title: "13. Our liability to you",
    paras: [
      <>
        Our total liability to you under this agreement is capped at the amount you have paid us
        in the 12 months before the event giving rise to the claim. We are not liable for
        indirect or consequential losses — including lost business, lost profits or lost
        opportunities while your site is unavailable. Nothing in this agreement excludes
        liability that cannot legally be excluded, including for death or personal injury caused
        by negligence, or for fraud.
      </>,
    ],
  },
  {
    title: "14. Data protection",
    paras: [
      <>
        For personal data collected through your website (such as contact-form enquiries from
        your customers), <strong>you are the data controller and we are your data processor</strong>{" "}
        under UK GDPR. We only process that data to operate your site and pass enquiries to you,
        we don't sell or reuse it, we use reputable service providers to store and transmit it,
        and we delete or return it when the agreement ends. Your site includes a privacy policy
        page describing this to your visitors. Each of us agrees to comply with data protection
        law that applies to us.
      </>,
    ],
  },
  {
    title: "15. Missed payments, notices and law",
    paras: [
      <>
        <strong>Missed payments:</strong> if a Direct Debit fails we'll retry it and email you.
        If payment is still outstanding 7 days after our warning email, we may suspend your
        website until the account is settled. Suspension doesn't pause the subscription or the
        notice period.
      </>,
      <>
        <strong>Notices:</strong> formal notices under this agreement (including cancellation)
        are valid by email — ours to the address you gave at signup, yours to
        alex@palmbay.digital.
      </>,
      <>
        <strong>Law:</strong> this agreement is governed by the law of England and Wales, and the
        courts of England and Wales have exclusive jurisdiction.
      </>,
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 md:py-24">
      <article className="mx-auto w-full max-w-3xl font-helvetica text-neutral-800">
        <p className="text-sm font-semibold text-neutral-500">Palm Bay Digital</p>
        <h1 className="mt-2 font-monument text-3xl font-bold text-neutral-900 md:text-4xl">
          Website Subscription Agreement
        </h1>
        <p className="mt-3 text-sm font-semibold text-neutral-500">{VERSION}</p>
        <p className="mt-6 leading-relaxed">
          This agreement is between <strong>Palm Bay Digital Ltd</strong> (company no. 15996143,
          registered in England &amp; Wales, registered office: Flat 12a Highcliffe Hall, 16
          Eastern Esplanade, Margate CT9 2JB — &ldquo;we&rdquo;, &ldquo;us&rdquo;) and the
          business named at signup (&ldquo;you&rdquo;). It covers the website subscription
          service we provide at the monthly price stated at signup.
        </p>
        {clauses.map((c) => (
          <section key={c.title} className="mt-10">
            <h2 className="font-monument text-lg font-bold text-neutral-900">{c.title}</h2>
            <div className="mt-3 space-y-3 leading-relaxed">
              {c.paras.map((p, i) => (
                <div key={i}>{p}</div>
              ))}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
}
