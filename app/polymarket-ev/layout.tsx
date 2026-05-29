import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polymarket EV Calculator - Expected Value | Calc-Tech.com',
  description: 'Calculate the expected value (EV) of a Polymarket bet from your probability and the market price. Find +EV prediction-market trades.',
  keywords: 'polymarket ev calculator, expected value calculator, prediction market ev, +EV betting, polymarket strategy, value betting calculator',
  openGraph: {
    title: 'Polymarket EV Calculator - Calc-Tech.com',
    description: 'Calculate the expected value (EV) of a Polymarket bet from your probability and price.',
    type: 'website',
    url: 'https://calc-tech.com/polymarket-ev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polymarket EV Calculator - Calc-Tech.com',
    description: 'Calculate the expected value (EV) of a Polymarket bet from your probability and price.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/polymarket-ev',
  },
};

export default function PolymarketEvLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
