import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pace Calculator - Running Pace, Time & Distance | Calc-Tech.com',
  description: 'Calculate running pace, finish time, or distance for races and training. Convert pace per mile and km for 5K, 10K, half, and marathon.',
  keywords: 'pace calculator, running pace calculator, race time calculator, pace per mile, marathon pace, 5k pace, running speed',
  openGraph: {
    title: 'Pace Calculator - Calc-Tech.com',
    description: 'Calculate running pace, finish time, or distance for races and training.',
    type: 'website',
    url: 'https://calc-tech.com/pace',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pace Calculator - Calc-Tech.com',
    description: 'Calculate running pace, finish time, or distance for races and training.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/pace',
  },
};

export default function PaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
