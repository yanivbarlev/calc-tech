import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Loan Calculator - Payments & Interest | Calc-Tech.com',
  description: 'Estimate monthly payments, total interest, and the true cost of a business loan. Compare terms and rates to finance your business affordably.',
  keywords: 'business loan calculator, commercial loan calculator, small business loan, business financing, monthly payment, business loan interest',
  openGraph: {
    title: 'Business Loan Calculator - Calc-Tech.com',
    description: 'Estimate monthly payments, total interest, and the true cost of a business loan. Compare terms and rates.',
    type: 'website',
    url: 'https://calc-tech.com/business-loan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Loan Calculator - Calc-Tech.com',
    description: 'Estimate monthly payments and total interest on a business loan. Compare terms and rates.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/business-loan',
  },
};

export default function BusinessLoanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
