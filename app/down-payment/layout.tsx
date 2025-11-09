import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Down Payment Calculator - Free Online Home Down Payment Tool | Calc-Tech.com',
  description: 'Calculate your home down payment, closing costs, and total upfront cash needed. Free online calculator with detailed monthly payment breakdowns and PMI guidance for first-time home buyers.',
  keywords: 'down payment calculator, home down payment, closing costs calculator, upfront cash calculator, PMI calculator, first time home buyer, FHA down payment, home buying calculator, mortgage down payment, house purchase calculator',
  openGraph: {
    title: 'Down Payment Calculator - Calc-Tech.com',
    description: 'Calculate your home down payment, closing costs, and total upfront cash needed. Get instant results with detailed breakdowns for smart home buying decisions.',
    type: 'website',
    url: 'https://calc-tech.com/down-payment',
    images: [
      {
        url: '/og-down-payment.png',
        width: 1200,
        height: 630,
        alt: 'Down Payment Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Down Payment Calculator - Calc-Tech.com',
    description: 'Calculate your home down payment, closing costs, and total upfront cash needed. Free online tool with instant results.',
    images: ['/og-down-payment.png']
  },
  alternates: {
    canonical: 'https://calc-tech.com/down-payment'
  }
};

export default function DownPaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
