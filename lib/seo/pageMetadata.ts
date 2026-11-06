import type { Metadata } from "next";
import { absoluteUrl } from "./site-url";
import { BUSINESS } from "./business";

/**
 * Every indexable route. The sitemap reads this list, so a page added here can't
 * be left out of it (Ahrefs: "Indexable page not in sitemap"). Private,
 * noindex pages (/offers, /go-live, /new) don't belong here.
 */
export const INDEXABLE_ROUTES = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cms-handbook", changeFrequency: "yearly", priority: 0.4 },
] as const;

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Palm Bay Digital - Website Design Agency Margate",
};

/**
 * Metadata for an indexable page that isn't driven by the Studio.
 *
 * Next.js *replaces* the layout's `openGraph` when a page sets one, and keeps it
 * whole when a page doesn't. So a page that set only `alternates.canonical`
 * inherited the layout's og:url (the home page), which Ahrefs flags as "Open
 * Graph URL not matching canonical". This sets both from the one `path`.
 *
 * `title` is the bare page title: the layout template appends the brand.
 */
export function pageMetadata(opts: {
  path: string;
  title: string;
  description: string;
  robots?: Metadata["robots"];
}): Metadata {
  const url = absoluteUrl(opts.path);
  const fullTitle = `${opts.title} | ${BUSINESS.name}`;
  return {
    title: opts.title,
    description: opts.description,
    robots: opts.robots ?? { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url,
      siteName: BUSINESS.name,
      locale: "en_GB",
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
