import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Tax Calculator - Free Online Sales Tax Calculator | Calc-Tech.com',
  description: 'Calculate sales tax, find pre-tax prices, or determine tax rates with our free online sales tax calculator. Includes comprehensive information about U.S. sales tax, VAT, GST, and state-by-state tax rates.',
  keywords: 'sales tax calculator, tax calculator, online tax calculator, free tax calculator, calculate sales tax, remove sales tax, find tax rate, VAT calculator, GST calculator, state sales tax rates',
  openGraph: {
    title: 'Sales Tax Calculator - Calc-Tech.com',
    description: 'Calculate sales tax, find pre-tax prices, or determine tax rates with our free online sales tax calculator.',
    type: 'website',
    url: 'https://calc-tech.com/sales-tax',
    images: [
      {
        url: '/og-image-sales-tax.png',
        width: 1200,
        height: 630,
        alt: 'Sales Tax Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Tax Calculator - Calc-Tech.com',
    description: 'Calculate sales tax, find pre-tax prices, or determine tax rates with our free online sales tax calculator.',
    images: ['/og-image-sales-tax.png']
  },
  alternates: {
    canonical: 'https://calc-tech.com/sales-tax'
  }
};

export default function SalesTaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
