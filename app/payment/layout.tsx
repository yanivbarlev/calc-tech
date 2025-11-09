import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Calculator - Free Loan Payment Calculator | Calc-Tech.com',
  description: 'Calculate monthly loan payments, total interest, and payoff time. Free payment calculator with amortization schedule for mortgages, auto loans, and personal loans. Compare fixed term vs fixed payment strategies.',
  keywords: 'payment calculator, loan calculator, monthly payment, loan payment calculator, debt payoff calculator, amortization calculator, interest calculator, mortgage payment, auto loan payment',
  openGraph: {
    title: 'Payment Calculator - Calc-Tech.com',
    description: 'Calculate monthly loan payments, total interest, and payoff time with our free payment calculator. Includes amortization schedule and debt payoff planning.',
    type: 'website',
    url: 'https://calc-tech.com/payment',
    images: [
      {
        url: '/og-image-payment.png',
        width: 1200,
        height: 630,
        alt: 'Payment Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payment Calculator - Calc-Tech.com',
    description: 'Calculate monthly loan payments, total interest, and payoff time with our free payment calculator.',
    images: ['/og-image-payment.png']
  },
  alternates: {
    canonical: 'https://calc-tech.com/payment'
  }
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
