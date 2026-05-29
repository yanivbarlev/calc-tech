import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Number Generator - Free Online Tool | Calc-Tech.com',
  description: 'Generate random numbers within any range. A free random number generator for raffles, games, sampling, and decision making.',
  keywords: 'random number generator, random number picker, rng, number generator, random picker, raffle number generator',
  openGraph: {
    title: 'Random Number Generator - Calc-Tech.com',
    description: 'Generate random numbers within any range for raffles, games, and sampling.',
    type: 'website',
    url: 'https://calc-tech.com/random-number',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Number Generator - Calc-Tech.com',
    description: 'Generate random numbers within any range for raffles, games, and sampling.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/random-number',
  },
};

export default function RandomNumberLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
