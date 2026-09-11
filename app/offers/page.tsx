import type { Metadata } from "next";
import clsx from "clsx";
import { BrandButton } from "@/components/ui/BrandButton";
import { OffersForm } from "@/components/offers/OffersForm";

export const metadata: Metadata = {
  title: "Your options | Palm Bay Digital",
  robots: { index: false, follow: false }, // private page, shared by link only
};

// Prices and copy mirror the vault note `Products/Offers Page.md` — change
// there first, then here. This is the agency site; the coldsite package keeps
// its own DEFAULT_PRICE_GBP for the £20 Site tier (two repos, two literals).
export type TierId = "site" | "care" | "gbp" | "growth";

interface Tier {
  id: TierId;
  name: string;
  price: string;
  priceNote?: string;
  promise: string;
  includes: string[];
  notIncluded: string;
  lifted?: boolean;
}

const TIERS: Tier[] = [
  {
    id: "site",
    name: "Site",
    price: "£20",
    promise: "Your website, live, looked after.",
    includes: [
      "Your own domain — new, or one you already have",
      "Fast, secure hosting, built to be found on Google",
      "Edit text and photos yourself, no developer needed",
      "Live within a week of saying yes",
    ],
    notIncluded: "Design changes by us — that’s the Care Plan.",
  },
  {
    id: "care",
    name: "Care Plan",
    price: "£39",
    promise: "Everything in Site, plus a human who keeps it right.",
    includes: [
      "Up to 30 minutes of changes every month — photos, prices, a page tweak",
      "Monitoring: we know it’s down before you do",
      "Security and software updates handled",
      "A yearly review: what to add, what to drop",
    ],
    notIncluded: "New pages or features (quoted separately). Google posting — that’s Autopilot.",
  },
  {
    id: "gbp",
    name: "GBP Autopilot",
    price: "£99",
    priceNote: "with a plan · £129 on its own",
    promise: "Your Google profile, kept active, without you touching it.",
    includes: [
      "An automated Google Business post every time you post on Instagram or Facebook",
      "Written for local search — your services, your towns",
      "Every Google review answered within 24 hours, in your voice. You approve anything under four stars",
      "Approve posts from your phone in seconds, or go fully automatic",
      "No website needed — this works on its own",
    ],
    notIncluded: "Ads. Writing content from scratch — that’s Growth.",
    lifted: true,
  },
  {
    id: "growth",
    name: "Growth",
    price: "from £350",
    promise: "Content that gets you found, month after month.",
    includes: [
      "Keyword research for your trade and your area — what people actually search",
      "Monthly articles on your site, written to rank",
      "Posted to Google automatically",
      "Everything in GBP Autopilot",
      "A monthly report: rankings, visitors, what changed",
    ],
    notIncluded: "Limited to three clients at a time.",
  },
];

const STEPS = [
  { n: "1", t: "Connect", d: "One button links your Instagram or Facebook. Five minutes, once." },
  { n: "2", t: "We post", d: "Every time you post, we post — in your voice, aimed at the searches that matter locally." },
  { n: "3", t: "You approve", d: "Or don’t have to — switch to automatic once you trust it." },
  { n: "4", t: "Reviews answered", d: "Within 24 hours. Anything under four stars waits for you." },
  { n: "5", t: "Numbers monthly", d: "What was posted, what was answered, what moved." },
];

const FAQ = [
  { q: "How long am I tied in?", a: "Monthly. Cancel any time with a month’s notice." },
  { q: "What happens if I cancel?", a: "Your site stays yours. We hand over the domain and the files." },
  { q: "Who owns the domain?", a: "You do. Always." },
  { q: "What happens to my Instagram?", a: "Nothing. We only read it — we never post there." },
  { q: "Do I need a website for GBP Autopilot?", a: "No. It works on its own with your Google profile." },
  { q: "How fast?", a: "Site: live within a week. Autopilot: your first post within a week of connecting." },
];

const TIER_IDS = new Set<string>(TIERS.map((t) => t.id));

function clean(s: string | undefined, max = 60): string {
  return (s ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

export default async function OffersPage({
  searchParams,
}: {
  searchParams: Promise<{ b?: string; for?: string }>;
}) {
  const sp = await searchParams;
  const business = clean(sp.b);
  const preselect = TIER_IDS.has(sp.for ?? "") ? (sp.for as TierId) : undefined;

  return (
    <main className="bg-palmbay-bluebg">
      {/* Intro */}
      <section className="px-[5%] pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container mx-auto max-w-5xl text-white">
          <p className="mb-3 font-formula text-sm uppercase tracking-[0.2em] text-palmbay-pink md:mb-4">
            {business ? `Prepared for ${business}` : "Your options"}
          </p>
          <h1 className="font-monument text-3xl leading-[1.1] md:text-5xl">
            {business ? `Four ways we can look after ${business}.` : "Four ways we can look after your business online."}
          </h1>
          <p className="mt-5 max-w-2xl font-helvetica text-lg font-light text-white/85">
            All monthly, all cancellable, all built on the same fast, findable foundation. Pick the one that
            fits — you can move up or down later.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-[5%] pb-16 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:items-start">
            {TIERS.map((t) => {
              const active = preselect === t.id;
              return (
                <article
                  key={t.id}
                  id={t.id}
                  className={clsx(
                    "flex flex-col rounded-3xl p-6 md:p-7",
                    t.lifted
                      ? "bg-white text-neutral-950 shadow-2xl ring-4 ring-palmbay-pink lg:-mt-6 lg:mb-6"
                      : "bg-white/[0.06] text-white ring-1 ring-white/15",
                    active && !t.lifted && "ring-2 ring-palmbay-pink",
                  )}
                >
                  {t.lifted && (
                    <p className="mb-3 inline-block self-start rounded-full bg-palmbay-pink px-3 py-1 font-formula text-xs uppercase tracking-[0.18em] text-neutral-950">
                      Most popular
                    </p>
                  )}
                  <h2 className="font-monument text-2xl">{t.name}</h2>
                  <p className="mt-3 font-monument text-4xl">
                    {t.price}
                    <span className={clsx("ml-1 font-helvetica text-base font-light", t.lifted ? "text-neutral-500" : "text-white/70")}>
                      /month
                    </span>
                  </p>
                  {t.priceNote && (
                    <p className={clsx("mt-1 font-helvetica text-sm", t.lifted ? "text-neutral-500" : "text-white/70")}>{t.priceNote}</p>
                  )}
                  <p className={clsx("mt-4 font-helvetica text-base", t.lifted ? "text-neutral-700" : "text-white/85")}>{t.promise}</p>
                  <ul className={clsx("mt-5 space-y-2.5 font-helvetica text-sm", t.lifted ? "text-neutral-800" : "text-white/90")}>
                    {t.includes.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className={clsx("mt-0.5", t.lifted ? "text-palmbay-darkpink" : "text-palmbay-pink")}>✦</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={clsx("mt-5 border-t pt-4 font-helvetica text-xs", t.lifted ? "border-neutral-200 text-neutral-500" : "border-white/15 text-white/60")}>
                    <span className="font-semibold">Not included:</span> {t.notIncluded}
                  </p>
                  <div className="mt-6">
                    <BrandButton
                      href={`?${new URLSearchParams({ ...(business ? { b: business } : {}), for: t.id })}#choose`}
                      variant={t.lifted ? "primary" : "ghost"}
                      className="w-full"
                    >
                      Choose {t.name}
                    </BrandButton>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-[5%] py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <p className="mb-3 font-formula text-sm uppercase tracking-[0.2em] text-palmbay-darkpink md:mb-4">How Autopilot works</p>
          <h2 className="font-monument text-3xl leading-[1.1] text-neutral-950 md:text-5xl">Five steps. You do one of them.</h2>
          <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <li key={s.n} className="border-t-2 border-palmbay-pink pt-4">
                <p className="font-formula text-sm text-palmbay-darkpink">{s.n}</p>
                <p className="mt-1 font-monument text-lg text-neutral-950">{s.t}</p>
                <p className="mt-2 font-helvetica text-sm text-neutral-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 px-[5%] py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-monument text-3xl leading-[1.1] text-neutral-950 md:text-4xl">Things people ask</h2>
          <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt className="font-monument text-lg text-neutral-950">{f.q}</dt>
                <dd className="mt-1.5 font-helvetica text-base text-neutral-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Choose */}
      <section id="choose" className="px-[5%] py-16 md:py-24">
        <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="text-white">
            <h2 className="font-monument text-3xl leading-[1.1] md:text-5xl">Tell us which one.</h2>
            <p className="mt-5 font-helvetica text-lg font-light text-white/85">
              We’ll reply within a day with what happens next. No call unless you want one.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-7 md:p-9">
            <OffersForm business={business} tiers={TIERS.map((t) => ({ id: t.id, name: t.name }))} preselect={preselect} />
          </div>
        </div>
      </section>
    </main>
  );
}
