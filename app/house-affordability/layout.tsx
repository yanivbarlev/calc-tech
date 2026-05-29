import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House Affordability Calculator - How Much Home Can I Afford | Calc-Tech.com',
  description: 'Find out how much house you can afford based on income, debts, down payment, and interest rate. Estimate a comfortable home price and monthly payment.',
  keywords: 'house affordability calculator, how much house can i afford, home affordability, mortgage affordability, home buying calculator, DTI calculator',
  openGraph: {
    title: 'House Affordability Calculator - Calc-Tech.com',
    description: 'Find out how much house you can afford based on income, debts, and down payment.',
    type: 'website',
    url: 'https://calc-tech.com/house-affordability',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Affordability Calculator - Calc-Tech.com',
    description: 'Find out how much house you can afford based on income, debts, and down payment.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/house-affordability',
  },
};

export default function HouseAffordabilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
