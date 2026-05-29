import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan Calculator - Monthly Payment & Total Interest | Calc-Tech.com',
  description: 'Calculate monthly loan payments, total interest, and payoff for any loan. Adjust amount, rate, and term to compare loan options instantly.',
  keywords: 'loan calculator, monthly payment calculator, loan interest calculator, loan payoff, personal loan calculator, installment loan calculator',
  openGraph: {
    title: 'Loan Calculator - Calc-Tech.com',
    description: 'Calculate monthly loan payments, total interest, and payoff for any loan. Compare options instantly.',
    type: 'website',
    url: 'https://calc-tech.com/loan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Calculator - Calc-Tech.com',
    description: 'Calculate monthly loan payments, total interest, and payoff for any loan.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/loan',
  },
};

export default function LoanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
