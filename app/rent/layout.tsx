import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rent Calculator - How Much Rent Can I Afford | Calc-Tech.com',
  description: 'Calculate how much rent you can afford based on your income and the 30% rule. Plan a budget that keeps housing costs comfortable.',
  keywords: 'rent calculator, how much rent can i afford, rent affordability, 30 percent rule, rent budget calculator, apartment affordability',
  openGraph: {
    title: 'Rent Calculator - Calc-Tech.com',
    description: 'Calculate how much rent you can afford based on your income and the 30% rule.',
    type: 'website',
    url: 'https://calc-tech.com/rent',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent Calculator - Calc-Tech.com',
    description: 'Calculate how much rent you can afford based on your income and the 30% rule.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/rent',
  },
};

export default function RentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
