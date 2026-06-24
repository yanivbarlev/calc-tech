import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Polymarket Sure Bet Finder Chrome Extension",
  description:
    "Privacy policy for the Polymarket Sure Bet Finder Chrome extension, including storage, Polymarket API access, AI scoring, license validation, and analytics.",
  alternates: {
    canonical: "https://calc-tech.com/extensions/sure-bet-finder/privacy",
  },
  openGraph: {
    title: "Privacy Policy - Polymarket Sure Bet Finder",
    description:
      "How Polymarket Sure Bet Finder handles public market data, local preferences, AI scoring requests, and license validation.",
    url: "https://calc-tech.com/extensions/sure-bet-finder/privacy",
    siteName: "Calc-Tech",
    type: "website",
  },
};

export default function SureBetFinderPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
