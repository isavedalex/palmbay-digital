import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/live";
import { HOME_QUERY } from "@/lib/sanity/queries";
import { buildSeoMeta, type SeoFieldsValue } from "@palmbay/sanity-seo/next";
import { SITE_URL, absoluteUrl } from "@/lib/seo/site-url";
import { hero as HERO } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { WorkSection } from "@/components/home/WorkSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { Marquee } from "@/components/home/Marquee";
import { StatementSection } from "@/components/home/StatementSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ContactSection } from "@/components/home/ContactSection";

interface HomeData {
  heading?: string;
  subheading?: string;
  body?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  seo?: SeoFieldsValue | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_QUERY });
  const seo = (data as HomeData | null)?.seo;
  // Nothing set in the Studio yet: let the layout's static metadata stand.
  if (!seo?.title && !seo?.description) return {};

  // Reads robots.noIndex / openGraph.imageType etc. exactly as stored, and
  // falls back OG → meta image → the static /og-image.jpg so og:image is
  // never dropped (Next.js replaces, not merges, the layout's openGraph).
  return buildSeoMeta({
    seo,
    baseUrl: SITE_URL,
    path: "/",
    defaults: {
      image: absoluteUrl("/og-image.jpg"),
      siteName: "Palm Bay Digital",
    },
  });
}

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOME_QUERY });
  const home = (data as HomeData | null) ?? {};

  return (
    <>
      <Navbar />
      <main>
        <HeroSection
        heading={home.heading || HERO.heading}
        subheading={home.subheading || HERO.subheading}
        body={home.body || HERO.body}
        ctaLabel={home.ctaLabel || HERO.ctaLabel}
        ctaUrl={home.ctaUrl || HERO.ctaUrl}
        secondaryLabel={HERO.secondaryLabel}
        secondaryUrl={HERO.secondaryUrl}
      />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <Marquee />
      <StatementSection />
      <ClientsSection />
      <ContactSection />
      </main>
    </>
  );
}
