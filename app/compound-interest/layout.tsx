import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Grow Your Money | Calc-Tech.com',
  description: 'See how compound interest grows your savings or investments over time. Calculate returns with regular contributions and compare compounding frequencies.',
  keywords: 'compound interest calculator, compound interest, investment growth calculator, interest calculator, savings growth, compounding frequency',
  openGraph: {
    title: 'Compound Interest Calculator - Calc-Tech.com',
    description: 'See how compound interest grows your savings or investments over time.',
    type: 'website',
    url: 'https://calc-tech.com/compound-interest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator - Calc-Tech.com',
    description: 'See how compound interest grows your savings or investments over time.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/compound-interest',
  },
};

export default function CompoundInterestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
