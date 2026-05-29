import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Loan Calculator - Payments & Payoff | Calc-Tech.com',
  description: 'Calculate student loan monthly payments, total interest, and payoff date. See how extra payments and refinancing shorten your repayment.',
  keywords: 'student loan calculator, student loan payoff, loan repayment calculator, student loan interest, college loan calculator, refinance student loan',
  openGraph: {
    title: 'Student Loan Calculator - Calc-Tech.com',
    description: 'Calculate student loan payments, total interest, and payoff date. See how extra payments help.',
    type: 'website',
    url: 'https://calc-tech.com/student-loan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Loan Calculator - Calc-Tech.com',
    description: 'Calculate student loan payments, total interest, and payoff date.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/student-loan',
  },
};

export default function StudentLoanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
