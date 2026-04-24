import type { Metadata } from "next";
import { Average, Nunito_Sans } from "next/font/google";
import Script from "next/script";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/lib/sanity/live";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import "./globals.css";

const averageFont = Average({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://palmbay.digital"),
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
    url: "https://palmbay.digital",
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
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://palmbay.digital",
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
  "@type": "WebDesignAgency",
  name: "Palm Bay Digital",
  description:
    "Professional website design and development agency based in Margate, Kent. Specialising in bespoke web design for UK businesses.",
  url: "https://palmbay.digital",
  logo: "https://palmbay.digital/logo.png",
  image: "https://palmbay.digital/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Margate",
    addressRegion: "Kent",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.3813",
    longitude: "1.3862",
  },
  areaServed: [
    { "@type": "City", name: "Margate" },
    { "@type": "City", name: "Broadstairs" },
    { "@type": "City", name: "Ramsgate" },
    { "@type": "State", name: "Kent" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  priceRange: "££",
  sameAs: [],
  serviceType: [
    "Website Design",
    "Web Development",
    "Bespoke Website Design",
    "Custom Web Development",
    "Responsive Web Design",
    "E-commerce Development",
  ],
  knowsAbout: [
    "Web Design",
    "Website Development",
    "UI/UX Design",
    "Frontend Development",
    "React Development",
    "Next.js Development",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "1",
  },
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
      <body
        className={`${averageFont.variable} ${nunitoSans.variable} antialiased`}
      >
        {children}
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
