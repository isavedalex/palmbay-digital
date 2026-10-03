import type { Metadata } from "next";
import Script from "next/script";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/lib/sanity/live";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/seo/site-url";
import { JsonLd } from "@palmbay/sanity-seo/next";
import { siteGraph } from "@/lib/seo/jsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Template: page titles from the Studio's SEO tab omit the brand and get
  // " | Palm Bay Digital" appended here (the seoFields titleSuffix option
  // shows editors the same suffix in the search preview).
  title: {
    default:
      "Website Designer Margate | Bespoke Web Design Agency UK | Palm Bay Digital",
    template: "%s | Palm Bay Digital",
  },
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <head>
        {/* Structured data: a plain server-rendered <script>, never next/script —
            that only lands in the RSC payload and a plain fetch sees nothing.
            Site-wide nodes here; WebPage + BreadcrumbList come from each page.
            `palmbay-structured-data` §2. */}
        <JsonLd data={siteGraph()} />
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
