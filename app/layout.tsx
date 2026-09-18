import type { Metadata } from "next";
import Script from "next/script";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/lib/sanity/live";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Footer } from "@/components/Footer";
import { SITE_URL, absoluteUrl } from "@/lib/seo/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Website Designer Margate | Bespoke Web Design Agency UK | Palm Bay Digital",
  description:
    "Award-winning website design agency in Margate, Kent. Specialising in bespoke web design & development for UK businesses. Expert website designers creating stunning, high-converting sites. Get a free consultation today.",
  keywords:
    "website designer Margate, web design agency Margate, website design UK, bespoke website design, Margate web designer, website development Kent, custom website design, web design agency UK",
  openGraph: {
    title:
      "Website Designer Margate | Bespoke Web Design Agency UK | Palm Bay Digital",
    description:
      "Award-winning website design agency in Margate, Kent. Specialising in bespoke web design & development for UK businesses.",
    url: SITE_URL,
    siteName: "Palm Bay Digital",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Palm Bay Digital - Website Design Agency Margate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Designer Margate | Bespoke Web Design Agency UK",
    description:
      "Award-winning website design agency in Margate, Kent. Creating stunning, high-converting websites for UK businesses.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  // ProfessionalService is a LocalBusiness subtype; "WebDesignAgency" is not a
  // schema.org type and Google discards the whole block when it sees one.
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Palm Bay Digital",
  description:
    "Small business web design studio in Margate, Kent. Website design, hosting, updates and being found on Google for businesses across Kent and the UK.",
  url: SITE_URL,
  image: absoluteUrl("/og-image.jpg"),
  telephone: "+447891173891",
  email: "alex@palmbay.digital",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Margate",
    addressRegion: "Kent",
    postalCode: "CT9",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.3813",
    longitude: "1.3862",
  },
  hasMap: "https://maps.google.com/maps?cid=3554470029172708408",
  sameAs: ["https://maps.google.com/maps?cid=3554470029172708408"],
  areaServed: [
    { "@type": "City", name: "Margate" },
    { "@type": "City", name: "Broadstairs" },
    { "@type": "City", name: "Ramsgate" },
    { "@type": "City", name: "Canterbury" },
    { "@type": "AdministrativeArea", name: "Thanet" },
    { "@type": "AdministrativeArea", name: "Kent" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  priceRange: "££",
  serviceType: [
    "Website Design",
    "Web Development",
    "Website Hosting and Maintenance",
    "Search Engine Optimisation",
    "Google Business Profile Setup",
  ],
  knowsAbout: [
    "Web Design",
    "Website Development",
    "Local SEO",
    "React Development",
    "Next.js Development",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          async
          src="https://plausible.io/js/pa-Wdr-AVVxsaQSnCUhuhsFT.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        <Footer />
        <SanityLive />
        {isDraftMode && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
