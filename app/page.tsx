import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/live";
import { HOME_QUERY } from "@/lib/sanity/queries";
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
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    openGraph?: { title?: string; description?: string; image?: string };
    twitter?: { card?: "summary" | "summary_large_image"; title?: string };
    robots?: { index?: boolean; follow?: boolean };
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_QUERY });
  const seo = (data as HomeData | null)?.seo;
  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
    alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      images: seo.openGraph?.image ? [{ url: seo.openGraph.image }] : undefined,
    },
    twitter: {
      card: seo.twitter?.card || "summary_large_image",
      title: seo.twitter?.title || seo.title,
    },
    robots: {
      index: seo.robots?.index !== false,
      follow: seo.robots?.follow !== false,
    },
  };
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
