import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Loan Calculator - Payments & Interest | Calc-Tech.com',
  description: 'Calculate monthly payments and total interest on a personal loan. Compare rates and terms to find an affordable borrowing option.',
  keywords: 'personal loan calculator, unsecured loan calculator, monthly payment, loan interest, personal loan payoff, installment loan',
  openGraph: {
    title: 'Personal Loan Calculator - Calc-Tech.com',
    description: 'Calculate monthly payments and total interest on a personal loan. Compare rates and terms.',
    type: 'website',
    url: 'https://calc-tech.com/personal-loan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Loan Calculator - Calc-Tech.com',
    description: 'Calculate monthly payments and total interest on a personal loan.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/personal-loan',
  },
};

export default function PersonalLoanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
