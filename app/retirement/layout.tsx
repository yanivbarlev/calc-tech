import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retirement Calculator - Plan Your Savings & Income | Calc-Tech.com',
  description: 'Estimate how much you need to retire and whether your savings are on track. Project retirement income from savings, contributions, and returns.',
  keywords: 'retirement calculator, retirement savings calculator, retirement planning, how much to retire, retirement income calculator, nest egg calculator',
  openGraph: {
    title: 'Retirement Calculator - Calc-Tech.com',
    description: 'Estimate how much you need to retire and whether your savings are on track.',
    type: 'website',
    url: 'https://calc-tech.com/retirement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Calculator - Calc-Tech.com',
    description: 'Estimate how much you need to retire and whether your savings are on track.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/retirement',
  },
};

export default function RetirementLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
