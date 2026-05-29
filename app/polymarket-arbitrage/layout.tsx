import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polymarket Arbitrage Calculator - Risk-Free Profit | Calc-Tech.com',
  description: 'Find arbitrage opportunities on Polymarket. Calculate guaranteed profit and optimal stakes across opposing prediction-market outcomes.',
  keywords: 'polymarket arbitrage calculator, prediction market arbitrage, arbitrage calculator, risk-free profit, polymarket strategy, betting arbitrage',
  openGraph: {
    title: 'Polymarket Arbitrage Calculator - Calc-Tech.com',
    description: 'Find arbitrage opportunities on Polymarket and calculate guaranteed profit and stakes.',
    type: 'website',
    url: 'https://calc-tech.com/polymarket-arbitrage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polymarket Arbitrage Calculator - Calc-Tech.com',
    description: 'Find arbitrage opportunities on Polymarket and calculate guaranteed profit.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/polymarket-arbitrage',
  },
};

export default function PolymarketArbitrageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
