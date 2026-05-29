import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator - Snowball & Avalanche Plans | Calc-Tech.com',
  description: 'Create a debt payoff plan and see how fast you can be debt-free. Compare snowball vs avalanche methods and how extra payments save interest.',
  keywords: 'debt payoff calculator, debt snowball calculator, debt avalanche calculator, pay off debt, debt free calculator, debt repayment plan',
  openGraph: {
    title: 'Debt Payoff Calculator - Calc-Tech.com',
    description: 'Create a debt payoff plan and see how fast you can be debt-free. Compare snowball vs avalanche.',
    type: 'website',
    url: 'https://calc-tech.com/debt-payoff',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Payoff Calculator - Calc-Tech.com',
    description: 'Create a debt payoff plan. Compare snowball vs avalanche and save interest.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/debt-payoff',
  },
};

export default function DebtPayoffLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
