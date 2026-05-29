import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Calculator - Sale Price & Savings | Calc-Tech.com',
  description: 'Calculate the sale price and amount saved from any percentage discount. Quickly figure final prices, markdowns, and stacked discounts.',
  keywords: 'discount calculator, sale price calculator, percent off calculator, markdown calculator, savings calculator, discount percentage',
  openGraph: {
    title: 'Discount Calculator - Calc-Tech.com',
    description: 'Calculate the sale price and amount saved from any percentage discount.',
    type: 'website',
    url: 'https://calc-tech.com/discount',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discount Calculator - Calc-Tech.com',
    description: 'Calculate the sale price and amount saved from any percentage discount.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/discount',
  },
};

export default function DiscountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
