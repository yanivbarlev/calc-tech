import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Savings Calculator - Calculate Compound Interest Growth | Calc-Tech.com',
  description: 'Free savings calculator to determine how your money grows over time with compound interest. Calculate savings growth with regular contributions, compare different interest rates, and plan your financial future.',
  keywords: 'savings calculator, compound interest calculator, savings growth calculator, interest calculator, financial planning, savings account calculator, investment calculator',
  openGraph: {
    title: 'Savings Calculator - Calc-Tech.com',
    description: 'Calculate how your savings will grow over time with compound interest and regular contributions. Free, accurate, and easy to use.',
    type: 'website',
    url: 'https://calc-tech.com/savings',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Calculator - Calc-Tech.com',
    description: 'Calculate how your savings will grow over time with compound interest and regular contributions.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/savings'
  }
};

export default function SavingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
