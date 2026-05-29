import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Percent Of, Change & More | Calc-Tech.com',
  description: 'Calculate percentages, percent change, percent of a number, and increases or decreases. A fast, free percentage calculator for everyday math.',
  keywords: 'percentage calculator, percent calculator, percent change calculator, percent of a number, percentage increase, percentage decrease',
  openGraph: {
    title: 'Percentage Calculator - Calc-Tech.com',
    description: 'Calculate percentages, percent change, percent of a number, and increases or decreases.',
    type: 'website',
    url: 'https://calc-tech.com/percentage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator - Calc-Tech.com',
    description: 'Calculate percentages, percent change, and percent of a number.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/percentage',
  },
};

export default function PercentageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
