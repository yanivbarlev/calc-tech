import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IRA Calculator - Traditional & Roth IRA Comparison | Calc-Tech.com",
  description: "Free IRA calculator to compare Traditional IRA, Roth IRA, and taxable accounts. Calculate retirement savings growth, tax benefits, and plan your financial future with accurate projections.",
  keywords: "ira calculator, traditional ira, roth ira calculator, retirement calculator, retirement savings, tax-deferred growth, tax-free retirement, retirement planning, investment calculator",
  openGraph: {
    title: "IRA Calculator - Traditional & Roth IRA Comparison | Calc-Tech.com",
    description: "Calculate and compare Traditional IRA, Roth IRA, and taxable account growth. Plan your retirement with tax-optimized savings strategies.",
    type: "website",
    url: "https://calc-tech.com/ira",
    images: [
      {
        url: "/og-image-ira.png",
        width: 1200,
        height: 630,
        alt: "IRA Calculator - Retirement Planning Tool"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "IRA Calculator - Traditional & Roth IRA Comparison",
    description: "Calculate and compare Traditional IRA, Roth IRA, and taxable account growth. Plan your retirement with tax-optimized savings strategies.",
    images: ["/og-image-ira.png"]
  },
  alternates: {
    canonical: "https://calc-tech.com/ira"
  }
};

export default function IRALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
