import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Calc-Tech.com",
  description:
    "View pricing for Calc-Tech browser extensions, including free tools, free tiers, one-time PRO upgrades, and monthly subscriptions.",
  keywords:
    "calc-tech pricing, chrome extension pricing, browser extension pricing, free extensions, pro extension license",
  openGraph: {
    title: "Pricing - Calc-Tech.com",
    description:
      "View pricing for Calc-Tech browser extensions, including free tools and paid PRO upgrades.",
    type: "website",
    url: "https://calc-tech.com/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - Calc-Tech.com",
    description:
      "View pricing for Calc-Tech browser extensions, including free tools and paid PRO upgrades.",
  },
  alternates: {
    canonical: "https://calc-tech.com/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
