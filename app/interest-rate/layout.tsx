import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interest Rate Calculator - Find the Rate on a Loan | Calc-Tech.com',
  description: 'Calculate the interest rate on a loan or investment from the payment, term, and amount. Find the true APR behind any financing offer.',
  keywords: 'interest rate calculator, find interest rate, loan rate calculator, effective interest rate, APR calculator, implied rate',
  openGraph: {
    title: 'Interest Rate Calculator - Calc-Tech.com',
    description: 'Calculate the interest rate on a loan or investment from the payment, term, and amount.',
    type: 'website',
    url: 'https://calc-tech.com/interest-rate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interest Rate Calculator - Calc-Tech.com',
    description: 'Calculate the interest rate on a loan or investment from payment, term, and amount.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/interest-rate',
  },
};

export default function InterestRateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
