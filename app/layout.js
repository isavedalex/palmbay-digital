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
  title: "Palm Bay Digital | Bespoke Website Design & Development",
  description: "Professional website design and development agency based in Margate, UK. We craft custom websites that help businesses stand out online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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