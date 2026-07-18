import type { Metadata } from "next";
import { ConversionForm } from "@/components/go-live/ConversionForm";

export const metadata: Metadata = {
  title: "Make your website live | Palm Bay Digital",
  robots: { index: false, follow: false }, // private landing, reached via QR/preview
};

const PREVIEW_BASE = process.env.NEXT_PUBLIC_PREVIEW_BASE_URL || "https://preview.palmbay.digital";

export default async function GoLivePage({
  searchParams,
}: {
  searchParams: Promise<{ b?: string; slug?: string; hero?: string }>;
}) {
  const sp = await searchParams;
  const business = sp.b?.trim() || "your business";
  const slug = sp.slug?.trim() || "";
  const hero = sp.hero?.trim() || "";
  const previewUrl = slug ? `${PREVIEW_BASE}/${slug}` : "";

  return (
    <main className="min-h-screen bg-palmbay-bluebg px-[5%] py-16 md:py-24">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* Recap of their preview */}
          <div className="text-white">
            {hero && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hero}
                alt={`${business} preview`}
                className="mb-6 aspect-[16/10] w-full rounded-2xl object-cover shadow-xl"
              />
            )}
            <h1 className="font-monument text-3xl font-bold leading-tight md:text-5xl">
              Let’s make {business}’s website live.
            </h1>
            <p className="mt-5 font-helvetica text-lg font-light text-white/85">
              You’ve seen the preview — this is the real thing, ready to go.
            </p>
            <ul className="mt-7 space-y-3 font-helvetica text-white/90">
              {[
                "£25/month, all in — your domain connected (new or one you already have)",
                "Edit it yourself, no developer needed",
                "Built to load fast and be found on Google",
                "Live within days of you saying yes",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 text-palmbay-pink">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {previewUrl && (
              <a
                href={previewUrl}
                className="mt-7 inline-block font-helvetica text-sm text-white/70 underline underline-offset-4 hover:text-white"
              >
                ← Back to your preview
              </a>
            )}
          </div>

          {/* Conversion form */}
          <div className="rounded-3xl bg-white p-7 md:p-9">
            <h2 className="font-monument text-2xl font-bold text-neutral-900">Go live</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Tell us where to send it and we’ll be in touch within a day.
            </p>
            <ConversionForm business={business} slug={slug} previewUrl={previewUrl} />
          </div>
        </div>
      </div>
    </main>
  );
}
