import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inflation Calculator - Value of Money Over Time | Calc-Tech.com',
  description: 'Calculate how inflation changes the purchasing power of money over time. See what a dollar was worth in past or future years using historical rates.',
  keywords: 'inflation calculator, purchasing power calculator, value of money over time, cost of living calculator, CPI calculator, inflation rate',
  openGraph: {
    title: 'Inflation Calculator - Calc-Tech.com',
    description: 'Calculate how inflation changes the purchasing power of money over time.',
    type: 'website',
    url: 'https://calc-tech.com/inflation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inflation Calculator - Calc-Tech.com',
    description: 'Calculate how inflation changes the purchasing power of money over time.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/inflation',
  },
};

export default function InflationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
