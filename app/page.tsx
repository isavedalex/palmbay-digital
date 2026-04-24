import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/live";
import { HOME_QUERY } from "@/lib/sanity/queries";
import { HeroSection } from "@/components/home/HeroSection";

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

const FALLBACK: Required<
  Pick<HomeData, "heading" | "subheading" | "body" | "ctaLabel" | "ctaUrl">
> = {
  heading: "PALM BAY DIGITAL",
  subheading: "Website Designer in Margate, Kent | Bespoke Web Design Agency",
  body: "Palm Bay Digital is a professional website design and development agency based in Margate, UK. As experienced website designers, we specialise in creating bespoke, high-converting websites for businesses across Kent and the UK. From stunning web design to custom development, we craft digital experiences that help your business stand out online. Ready to bring your vision to life? Let's create something exceptional together.",
  ctaLabel: "Work with us",
  ctaUrl: "https://form.typeform.com/to/UEaAB8BR",
};

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
    <HeroSection
      heading={home.heading || FALLBACK.heading}
      subheading={home.subheading || FALLBACK.subheading}
      body={home.body || FALLBACK.body}
      ctaLabel={home.ctaLabel || FALLBACK.ctaLabel}
      ctaUrl={home.ctaUrl || FALLBACK.ctaUrl}
    />
  );
}
