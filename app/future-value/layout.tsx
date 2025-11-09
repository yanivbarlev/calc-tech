import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Future Value Calculator - Calculate Investment Growth with Compound Interest | Calc-Tech.com',
  description: 'Free future value calculator to determine what your investment will be worth. Calculate FV with compound interest, periodic deposits, and detailed growth schedules. Plan retirement savings and long-term financial goals.',
  keywords: 'future value calculator, fv calculator, investment calculator, compound interest calculator, retirement planning calculator, savings growth calculator, financial calculator, time value of money, annuity calculator, online calculator, free calculator',
  openGraph: {
    title: 'Future Value Calculator - Calc-Tech.com',
    description: 'Calculate what your investment will be worth in the future with compound interest and regular contributions. Free online FV calculator with detailed growth schedules.',
    type: 'website',
    url: 'https://calc-tech.com/future-value',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Value Calculator - Calc-Tech.com',
    description: 'Calculate what your investment will be worth in the future with compound interest and regular contributions. Plan your financial future today.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/future-value'
  }
};

export default function FutureValueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
