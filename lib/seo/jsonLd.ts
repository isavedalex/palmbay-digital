import {
  graph,
  ids,
  ref,
  localBusinessJsonLd,
  webSiteJsonLd,
  webPageJsonLd,
  breadcrumbJsonLd,
  serviceJsonLd,
  type JsonLdNode,
} from "@palmbay/sanity-seo/next";
import { SITE_URL, absoluteUrl } from "./site-url";
import { BUSINESS } from "./business";

/** The business node — identical on every page (`palmbay-structured-data` §3). */
export function businessNode(): JsonLdNode {
  return localBusinessJsonLd({
    type: BUSINESS.schemaType,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    description: BUSINESS.description,
    telephone: BUSINESS.phone.e164,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: BUSINESS.address,
    geo: BUSINESS.geo,
    hasMap: BUSINESS.googleBusinessProfileUrl,
    areaServed: [...BUSINESS.areasServed],
    sameAs: [BUSINESS.googleBusinessProfileUrl, ...BUSINESS.socialUrls],
    inLanguage: "en-GB",
    hasOfferCatalog: {
      name: "Services",
      items: BUSINESS.services.map((s) => ({ itemOffered: ref(ids.service(SITE_URL, s.slug)) })),
    },
  });
}

/** Site-wide nodes rendered once from the root layout. */
export function siteGraph(): JsonLdNode {
  return graph([
    { ...businessNode(), knowsAbout: [...BUSINESS.knowsAbout] },
    webSiteJsonLd({
      name: BUSINESS.name,
      url: SITE_URL,
      publisher: ref(ids.business(SITE_URL)),
      inLanguage: "en-GB",
    }),
    ...BUSINESS.services.map((s) =>
      serviceJsonLd({
        id: ids.service(SITE_URL, s.slug),
        name: s.name,
        description: s.description,
        serviceType: s.name,
        provider: ref(ids.business(SITE_URL)),
        areaServed: ["Margate", { type: "AdministrativeArea", name: "Kent" }],
        url: SITE_URL,
      }),
    ),
  ]);
}

/** Per-page nodes: WebPage + BreadcrumbList, linked back to the site nodes. */
export function pageGraph(opts: {
  path: string;
  title: string;
  description?: string;
  type?: string;
  crumbs?: { name: string; url?: string }[];
}): JsonLdNode {
  const pageUrl = absoluteUrl(opts.path);
  const crumbs = opts.crumbs ?? (opts.path === "/" ? [{ name: "Home", url: SITE_URL }] : [{ name: "Home", url: SITE_URL }, { name: opts.title }]);
  return graph([
    webPageJsonLd({
      type: opts.type,
      url: pageUrl,
      name: opts.title,
      description: opts.description,
      isPartOf: ref(ids.website(SITE_URL)),
      about: ref(ids.business(SITE_URL)),
      breadcrumb: ref(ids.breadcrumb(pageUrl)),
      inLanguage: "en-GB",
    }),
    breadcrumbJsonLd(crumbs, { id: ids.breadcrumb(pageUrl) }),
  ]);
}
