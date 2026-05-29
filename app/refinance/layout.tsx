import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refinance Calculator - Mortgage Refinance Savings | Calc-Tech.com',
  description: 'See if refinancing your mortgage saves money. Compare your current loan to a new rate and find your break-even point and monthly savings.',
  keywords: 'refinance calculator, mortgage refinance calculator, refinance savings, break-even calculator, refinance rate, lower mortgage payment',
  openGraph: {
    title: 'Refinance Calculator - Calc-Tech.com',
    description: 'See if refinancing your mortgage saves money. Find your break-even point and monthly savings.',
    type: 'website',
    url: 'https://calc-tech.com/refinance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refinance Calculator - Calc-Tech.com',
    description: 'See if refinancing your mortgage saves money. Find your break-even point and savings.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/refinance',
  },
};

export default function RefinanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
