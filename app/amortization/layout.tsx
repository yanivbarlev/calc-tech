import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amortization Calculator - Free Online Loan Payment Schedule | Calc-Tech.com',
  description: 'Calculate your loan amortization schedule with monthly and annual breakdowns. See exactly how much principal and interest you pay each month. Free online amortization calculator with extra payment options.',
  keywords: 'amortization calculator, loan amortization, payment schedule, loan calculator, mortgage amortization, principal and interest, extra payments, loan payoff calculator',
  openGraph: {
    title: 'Amortization Calculator - Calc-Tech.com',
    description: 'Calculate your loan amortization schedule with detailed monthly and annual breakdowns. Visualize how extra payments can save you thousands in interest.',
    type: 'website',
    url: 'https://calc-tech.com/amortization',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amortization Calculator - Calc-Tech.com',
    description: 'Calculate your loan amortization schedule with detailed monthly and annual breakdowns.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/amortization'
  }
};

export default function AmortizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
