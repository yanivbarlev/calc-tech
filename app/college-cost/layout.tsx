import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'College Cost Calculator - Future Tuition & Savings | Calc-Tech.com',
  description: 'Estimate the future cost of college and how much to save. Plan for tuition with projected inflation and savings growth.',
  keywords: 'college cost calculator, college savings calculator, future tuition cost, 529 calculator, education savings, college planning',
  openGraph: {
    title: 'College Cost Calculator - Calc-Tech.com',
    description: 'Estimate the future cost of college and how much to save for tuition.',
    type: 'website',
    url: 'https://calc-tech.com/college-cost',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'College Cost Calculator - Calc-Tech.com',
    description: 'Estimate the future cost of college and how much to save for tuition.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/college-cost',
  },
};

export default function CollegeCostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
