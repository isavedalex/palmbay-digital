import type { Metadata } from "next";
import { NewCoForm } from "@/components/new/NewCoForm";

export const metadata: Metadata = {
  title: "Your new company, online | Palm Bay Digital",
  robots: { index: false, follow: false }, // reached from NewCo letters only
};

/**
 * NewCo landing page — the URL printed on letters to newly incorporated
 * companies (`palmbay.digital/new?c=<company number>`). Reads the public
 * Companies House record server-side so the page already knows the company:
 * that recognition is what a personalised preview does for coldsite leads.
 * Offer: £45/mo — site + free .co.uk year one + Google Business Profile set up
 * and kept active. Copy source of truth: vault Runbooks/NewCo Letters.md.
 */

const PRICE = 45;

interface ChProfile {
  company_name?: string;
  company_number?: string;
  date_of_creation?: string;
  registered_office_address?: { locality?: string; postal_code?: string };
  sic_codes?: string[];
}

async function lookup(number: string): Promise<ChProfile | null> {
  const key = process.env.COMPANIES_HOUSE_API_KEY;
  if (!key || !/^[A-Z0-9]{8}$/i.test(number)) return null;
  try {
    const res = await fetch(`https://api.company-information.service.gov.uk/company/${number}`, {
      headers: { Authorization: "Basic " + Buffer.from(`${key}:`).toString("base64") },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ChProfile;
  } catch {
    return null;
  }
}

function prettyName(legal: string): string {
  return legal
    .replace(/\b(LIMITED|LTD\.?|LLP|PLC)\b\.?$/i, "")
    .trim()
    .toLowerCase()
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase())
    .replace(/\b(And|Of|The)\b/g, (w) => w.toLowerCase());
}
/**
 * Never show a domain that isn't actually available (the first letter proof
 * named one registered since 2025). Nominet RDAP: 404 = available, 200 = taken.
 * Same candidate order as the orchestrator's lib/domain-check.ts. Null → the
 * page says "your own .co.uk domain" and names none.
 */
async function availableDomain(legal: string, town: string): Promise<string | null> {
  const base = legal.replace(/\b(LIMITED|LTD\.?|LLP|PLC)\b\.?$/i, "").replace(/&/g, " and ").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 40);
  if (!base) return null;
  const t = town.toLowerCase().replace(/[^a-z]/g, "");
  const candidates = [`${base}.co.uk`, `${base}.uk`, `${base}ltd.co.uk`, ...(t && t !== base ? [`${base}${t}.co.uk`] : [])];
  for (const d of candidates) {
    try {
      const res = await fetch(`https://rdap.nominet.uk/uk/domain/${d}`, { headers: { Accept: "application/rdap+json" }, signal: AbortSignal.timeout(4000), next: { revalidate: 3600 } });
      if (res.status === 404) return d;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

export default async function NewCoPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c = "" } = await searchParams;
  const number = c.trim().toUpperCase();
  const co = number ? await lookup(number) : null;
  const legal = co?.company_name ?? "";
  const name = legal ? prettyName(legal) : "your new company";
  const town = co?.registered_office_address?.locality ?? "";
  const checked = legal ? await availableDomain(legal, town) : null;
  const domain = checked ?? "your-company.co.uk";
  const domainLine = checked ? `A fast, mobile-first website at ${checked} — edit it yourself, no developer needed` : "A fast, mobile-first website on your own .co.uk domain — edit it yourself, no developer needed";

  const includes = [
    domainLine,
    "A free .co.uk domain for your first year, and email on it",
    "Your Google Business Profile set up, verified and kept active — on Maps from day one",
    "Live within a week of saying yes. Cancel monthly.",
  ];

  return (
    <main className="bg-palmbay-bluebg">
      <section className="px-[5%] pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="container mx-auto max-w-5xl">
          <p className="mb-3 font-formula text-sm uppercase tracking-[0.2em] text-palmbay-pink md:mb-4">
            {legal ? `Prepared for ${name}${town ? ` · ${town}` : ""}` : "Your new company, online"}
          </p>
          <h1 className="font-monument text-3xl leading-[1.1] text-white md:text-5xl">
            {legal ? `${name} — online by next week.` : "Congratulations on your new company."}
          </h1>
          <p className="mt-5 max-w-2xl font-helvetica text-lg font-light text-white/85">
            Companies House gave you a number. We give you the three things your first customers look for:
            a website, a Google listing, and an email on your own domain.
          </p>
        </div>
      </section>

      <section className="px-[5%] pb-16 md:pb-24">
        <div className="container mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          {/* the "already knows you" moment: a browser frame with their domain */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
              <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-100 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /><span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /><span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                <span className="ml-3 flex-1 rounded-md bg-white px-3 py-1 font-helvetica text-sm text-neutral-700 ring-1 ring-neutral-200">https://{domain}</span>
              </div>
              <div className="p-7 md:p-9">
                <p className="font-formula text-xs uppercase tracking-[0.2em] text-palmbay-darkpink">{town ? `${town} · ` : ""}Est. {co?.date_of_creation?.slice(0, 4) ?? new Date().getFullYear()}</p>
                <p className="mt-3 font-monument text-2xl leading-tight text-neutral-950 md:text-4xl">{name}</p>
                <p className="mt-3 font-helvetica text-neutral-600">Your services, your area, your phone number — and a Google listing that sends people here.</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["Services", "Reviews", "Contact"].map((s) => (
                    <div key={s} className="rounded-xl bg-neutral-100 px-3 py-6 text-center font-helvetica text-sm font-semibold text-neutral-500">{s}</div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 font-helvetica text-sm text-white/70">A sketch, not a promise — the real thing is built around what you actually do.</p>
          </div>

          <div className="rounded-3xl bg-white p-7 md:p-9">
            <p className="font-monument text-4xl text-neutral-950">
              £{PRICE}<span className="ml-1 font-helvetica text-base font-light text-neutral-500">/month, all in</span>
            </p>
            <ul className="mt-5 space-y-3 font-helvetica text-[15px] text-neutral-800">
              {includes.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-palmbay-darkpink">✦</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <NewCoForm business={legal || ""} companyNumber={co?.company_number ?? number} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-[5%] py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-monument text-2xl leading-[1.1] text-neutral-950 md:text-4xl">Things new companies ask</h2>
          <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {[
              ["Why did I get a letter?", "Companies House lists you as a director of a newly incorporated company. We write to new companies once; email stop@palmbay.digital and we won't again."],
              ["How long am I tied in?", "Monthly. Cancel any time with a month's notice. The domain is yours."],
              ["I don't have photos or a logo yet.", "Most new companies don't. We start with a clean, credible site and swap in your photos as you get them — you can do it yourself."],
              ["What about Google?", "We create and verify your Google Business Profile, then keep it active with posts and answered reviews. That's how local customers find you."],
            ].map(([q, a]) => (
              <div key={q}>
                <dt className="font-monument text-base text-neutral-950">{q}</dt>
                <dd className="mt-1.5 font-helvetica text-neutral-600">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
