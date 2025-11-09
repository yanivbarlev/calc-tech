import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interest Calculator - Free Compound Interest Calculator | Calc-Tech.com',
  description: 'Calculate compound interest growth with our free online calculator. Include contributions, multiple compounding frequencies, tax rates, and inflation adjustments for accurate projections.',
  keywords: 'interest calculator, compound interest calculator, savings calculator, investment calculator, interest rate calculator, online calculator, free calculator',
  openGraph: {
    title: 'Interest Calculator - Calc-Tech.com',
    description: 'Calculate compound interest growth with flexible contributions and compounding frequencies. Free online tool with detailed breakdowns.',
    type: 'website',
    url: 'https://calc-tech.com/interest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interest Calculator - Calc-Tech.com',
    description: 'Calculate compound interest growth with flexible contributions and compounding frequencies.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/interest'
  }
};

export default function InterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
