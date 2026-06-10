import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import GoogleAnalytics from "./components/GoogleAnalytics";
import AdSense from "./components/AdSense";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calc-tech.com"),
  title: "Calc-Tech: 200+ Free Online Calculators & Tools",
  description:
    "Free online calculators for finance, health, math, and more. Loan calculators, mortgage calculators, tax calculators, and 200+ other tools. No ads, no tracking, instant results.",
  keywords:
    "calculator, online calculator, free calculator, loan calculator, mortgage calculator, tax calculator, financial calculator, math calculator",
  authors: [{ name: "Calc-Tech" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calc-tech.com",
    siteName: "Calc-Tech",
    title: "Calc-Tech: 200+ Free Online Calculators & Tools",
    description:
      "Free online calculators for finance, health, math, and more. No ads, instant results.",
    images: [
      {
        url: "https://calc-tech.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calc-Tech - Online Calculators",
      },
    ],
  },
  other: {
    "google-adsense-account": "ca-pub-2201920716197483",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AdSense />
          <GoogleAnalytics GA_MEASUREMENT_ID="G-GRVM5D975D" />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-1006081641"
            strategy="afterInteractive"
          />
          <Script id="google-ads-gtag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-1006081641');
            `}
          </Script>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
