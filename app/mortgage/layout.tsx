import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Monthly Payment Estimator | Calc-Tech.com',
  description: 'Estimate your monthly mortgage payment including principal, interest, taxes, and insurance. Compare loan terms and see how much interest you pay over time.',
  keywords: 'mortgage calculator, home loan calculator, monthly mortgage payment, principal and interest, PITI calculator, house payment calculator, amortization',
  openGraph: {
    title: 'Mortgage Calculator - Calc-Tech.com',
    description: 'Estimate your monthly mortgage payment with principal, interest, taxes, and insurance. Compare terms and total interest.',
    type: 'website',
    url: 'https://calc-tech.com/mortgage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator - Calc-Tech.com',
    description: 'Estimate your monthly mortgage payment and total interest. Free and easy to use.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/mortgage',
  },
};

export default function MortgageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
