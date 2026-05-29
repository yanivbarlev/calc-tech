import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Loan Calculator - Monthly Car Payment Estimator | Calc-Tech.com',
  description: 'Calculate your monthly car payment, total interest, and loan cost. Compare auto loan terms, rates, and down payments to find an affordable car loan.',
  keywords: 'auto loan calculator, car loan calculator, car payment calculator, vehicle loan, monthly car payment, auto financing calculator',
  openGraph: {
    title: 'Auto Loan Calculator - Calc-Tech.com',
    description: 'Calculate your monthly car payment, total interest, and loan cost. Compare auto loan terms and rates.',
    type: 'website',
    url: 'https://calc-tech.com/auto-loan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Loan Calculator - Calc-Tech.com',
    description: 'Calculate your monthly car payment and total interest. Compare auto loan terms and rates.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/auto-loan',
  },
};

export default function AutoLoanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
