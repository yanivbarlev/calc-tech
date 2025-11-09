import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credit Card Calculator - Free Payoff Calculator | Calc-Tech.com',
  description: 'Calculate your credit card payoff timeline and total interest costs. Find out how long it will take to pay off your credit card debt and how much you can save with different payment strategies.',
  keywords: 'credit card calculator, credit card payoff calculator, debt payoff calculator, credit card interest calculator, minimum payment calculator, debt repayment calculator, online calculator, free calculator',
  openGraph: {
    title: 'Credit Card Calculator - Calc-Tech.com',
    description: 'Calculate your credit card payoff timeline and total interest costs. See how different payment strategies can save you thousands of dollars.',
    type: 'website',
    url: 'https://calc-tech.com/credit-card',
    images: [
      {
        url: '/og-image-credit-card.png',
        width: 1200,
        height: 630,
        alt: 'Credit Card Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Calculator - Calc-Tech.com',
    description: 'Calculate your credit card payoff timeline and total interest costs. See how different payment strategies can save you thousands of dollars.',
    images: ['/og-image-credit-card.png']
  },
  alternates: {
    canonical: 'https://calc-tech.com/credit-card'
  }
};

export default function CreditCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
