import { Average, Nunito_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const averageFont = Average({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-heading',
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: '--font-body',
});

export const metadata = {
  title: "Website Designer Margate | Bespoke Web Design Agency UK | Palm Bay Digital",
  description: "Award-winning website design agency in Margate, Kent. Specialising in bespoke web design & development for UK businesses. Expert website designers creating stunning, high-converting sites. Get a free consultation today.",
  keywords: "website designer Margate, web design agency Margate, website design UK, bespoke website design, Margate web designer, website development Kent, custom website design, web design agency UK",
  openGraph: {
    title: "Website Designer Margate | Bespoke Web Design Agency UK | Palm Bay Digital",
    description: "Award-winning website design agency in Margate, Kent. Specialising in bespoke web design & development for UK businesses.",
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
    description: "Award-winning website design agency in Margate, Kent. Creating stunning, high-converting websites for UK businesses.",
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebDesignAgency",
    "name": "Palm Bay Digital",
    "description": "Professional website design and development agency based in Margate, Kent. Specialising in bespoke web design for UK businesses.",
    "url": "https://palmbay.digital",
    "logo": "https://palmbay.digital/logo.png",
    "image": "https://palmbay.digital/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Margate",
      "addressRegion": "Kent",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.3813",
      "longitude": "1.3862"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Margate"
      },
      {
        "@type": "City",
        "name": "Broadstairs"
      },
      {
        "@type": "City",
        "name": "Ramsgate"
      },
      {
        "@type": "State",
        "name": "Kent"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      }
    ],
    "priceRange": "££",
    "sameAs": [],
    "serviceType": [
      "Website Design",
      "Web Development",
      "Bespoke Website Design",
      "Custom Web Development",
      "Responsive Web Design",
      "E-commerce Development"
    ],
    "knowsAbout": [
      "Web Design",
      "Website Development",
      "UI/UX Design",
      "Frontend Development",
      "React Development",
      "Next.js Development"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Google Consent Mode V2 - Must load BEFORE other scripts */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Default consent to denied (Cookiebot will update based on user choice)
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });

            gtag('set', 'ads_data_redaction', true);
          `}
        </Script>

        {/* Cookiebot - Consent Management Platform */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="ed02114d-19d7-4f2d-9139-7fd6e72c25c2"
          data-blockingmode="auto"
          type="text/javascript"
          strategy="beforeInteractive"
        />

        {/* Google Tag Manager - Loads after consent */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17758304015"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17758304015');
          `}
        </Script>
      </head>
      <body className={`${averageFont.variable} ${nunitoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}