import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commission Calculator - Sales Commission & Earnings | Calc-Tech.com',
  description: 'Calculate sales commission, tiered rates, and total earnings. Quickly figure commission amounts for any sale or pay structure.',
  keywords: 'commission calculator, sales commission calculator, commission rate, tiered commission, earnings calculator, commission pay',
  openGraph: {
    title: 'Commission Calculator - Calc-Tech.com',
    description: 'Calculate sales commission, tiered rates, and total earnings for any sale.',
    type: 'website',
    url: 'https://calc-tech.com/commission',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commission Calculator - Calc-Tech.com',
    description: 'Calculate sales commission, tiered rates, and total earnings for any sale.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/commission',
  },
};

export default function CommissionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
