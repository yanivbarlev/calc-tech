import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polymarket Kelly Calculator - Optimal Bet Size | Calc-Tech.com',
  description: 'Use the Kelly criterion to size Polymarket bets for optimal long-term growth. Calculate the ideal stake from your edge and bankroll.',
  keywords: 'polymarket kelly calculator, kelly criterion calculator, optimal bet size, bankroll management, kelly stake, prediction market betting',
  openGraph: {
    title: 'Polymarket Kelly Calculator - Calc-Tech.com',
    description: 'Use the Kelly criterion to size Polymarket bets for optimal long-term growth.',
    type: 'website',
    url: 'https://calc-tech.com/polymarket-kelly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polymarket Kelly Calculator - Calc-Tech.com',
    description: 'Use the Kelly criterion to size Polymarket bets for optimal long-term growth.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/polymarket-kelly',
  },
};

export default function PolymarketKellyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
