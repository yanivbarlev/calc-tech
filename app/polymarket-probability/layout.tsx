import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polymarket Probability Calculator - Implied Odds | Calc-Tech.com',
  description: 'Convert Polymarket prices to implied probability and back. Compare market odds with your own estimate to spot mispriced markets.',
  keywords: 'polymarket probability calculator, implied probability calculator, odds to probability, prediction market odds, market price to probability',
  openGraph: {
    title: 'Polymarket Probability Calculator - Calc-Tech.com',
    description: 'Convert Polymarket prices to implied probability and back to spot mispriced markets.',
    type: 'website',
    url: 'https://calc-tech.com/polymarket-probability',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polymarket Probability Calculator - Calc-Tech.com',
    description: 'Convert Polymarket prices to implied probability and back.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/polymarket-probability',
  },
};

export default function PolymarketProbabilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
