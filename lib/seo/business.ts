import { SITE_URL, absoluteUrl } from "./site-url";

/**
 * The one place Palm Bay Digital's identity facts live. Footer, contact copy
 * and the JSON-LD business node all read from here so NAP (name, address,
 * phone) is byte-for-byte identical everywhere — and matches the Google
 * Business Profile. `palmbay-structured-data` §2 rule 2.
 */
export const BUSINESS = {
  name: "Palm Bay Digital",
  legalName: "Palm Bay Digital",
  /** schema.org LocalBusiness subtype. A web studio has no closer subtype;
   *  ProfessionalService is deprecated by schema.org, so plain LocalBusiness. */
  schemaType: "LocalBusiness",
  description:
    "Small business web design studio in Margate, Kent. Website design, hosting, updates and being found on Google for businesses across Kent and the UK.",
  url: SITE_URL,
  logo: absoluteUrl("/icon.png"),
  image: absoluteUrl("/og-image.jpg"),
  phone: { display: "07891 173891", e164: "+447891173891" },
  email: "hello@palmbay.digital",
  priceRange: "££",
  address: {
    addressLocality: "Margate",
    addressRegion: "Kent",
    postalCode: "CT9",
    addressCountry: "GB",
  },
  geo: { latitude: 51.38133, longitude: 1.38622 },
  googleBusinessProfileUrl: "https://maps.google.com/maps?cid=3554470029172708408",
  socialUrls: [
    "https://www.facebook.com/profile.php?id=61584315687257",
    "https://www.instagram.com/palmbay.digital/",
  ],
  areasServed: [
    "Margate",
    "Broadstairs",
    "Ramsgate",
    "Canterbury",
    { type: "AdministrativeArea" as const, name: "Thanet" },
    { type: "AdministrativeArea" as const, name: "Kent" },
    { type: "Country" as const, name: "United Kingdom" },
  ],
  knowsAbout: ["Web Design", "Website Development", "Local SEO", "React Development", "Next.js Development"],
  services: [
    { slug: "website-design", name: "Website Design", description: "Bespoke, mobile-first websites for small businesses." },
    { slug: "web-development", name: "Web Development", description: "Next.js and Sanity builds with editable content." },
    { slug: "hosting-and-maintenance", name: "Website Hosting and Maintenance", description: "Hosting, updates and monitoring on a monthly plan." },
    { slug: "seo", name: "Search Engine Optimisation", description: "Local SEO, structured data and content for being found on Google." },
    { slug: "google-business-profile", name: "Google Business Profile Setup", description: "Listing setup and optimisation for the local map pack." },
  ],
} as const;
