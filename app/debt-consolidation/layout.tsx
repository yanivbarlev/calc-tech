import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator - Free Online Tool | Calc-Tech.com',
  description: 'Compare your current debts with a consolidation loan to calculate potential savings. Free debt consolidation calculator shows monthly payment reductions, interest savings, and real APR with fees.',
  keywords: 'debt consolidation calculator, debt consolidation, loan consolidation, consolidate debt, debt payoff calculator, debt reduction, lower interest rate, monthly payment calculator',
  openGraph: {
    title: 'Debt Consolidation Calculator - Calc-Tech.com',
    description: 'Compare your current debts with a consolidation loan to calculate potential savings on monthly payments and total interest.',
    type: 'website',
    url: 'https://calc-tech.com/debt-consolidation',
    images: [
      {
        url: '/og-image-debt-consolidation.png',
        width: 1200,
        height: 630,
        alt: 'Debt Consolidation Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Consolidation Calculator - Calc-Tech.com',
    description: 'Compare your current debts with a consolidation loan to calculate potential savings on monthly payments and total interest.',
    images: ['/og-image-debt-consolidation.png']
  },
  alternates: {
    canonical: 'https://calc-tech.com/debt-consolidation'
  }
};

export default function DebtConsolidationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
