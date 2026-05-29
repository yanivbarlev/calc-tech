import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMR Calculator - Basal Metabolic Rate & Calorie Needs | Calc-Tech.com',
  description: 'Calculate your Basal Metabolic Rate (BMR) and daily calorie needs. Find how many calories you burn at rest to plan diet and weight goals.',
  keywords: 'bmr calculator, basal metabolic rate calculator, calories burned at rest, metabolism calculator, calorie needs, Mifflin St Jeor',
  openGraph: {
    title: 'BMR Calculator - Calc-Tech.com',
    description: 'Calculate your Basal Metabolic Rate (BMR) and daily calorie needs.',
    type: 'website',
    url: 'https://calc-tech.com/bmr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMR Calculator - Calc-Tech.com',
    description: 'Calculate your Basal Metabolic Rate (BMR) and daily calorie needs.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/bmr',
  },
};

export default function BmrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
