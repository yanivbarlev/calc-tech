import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calorie Calculator - Daily Calorie Needs (TDEE) | Calc-Tech.com',
  description: 'Calculate your daily calorie needs (TDEE) for weight loss, maintenance, or gain. Based on age, activity, and goals using proven formulas.',
  keywords: 'calorie calculator, TDEE calculator, daily calorie needs, calorie intake calculator, weight loss calculator, maintenance calories',
  openGraph: {
    title: 'Calorie Calculator - Calc-Tech.com',
    description: 'Calculate your daily calorie needs (TDEE) for weight loss, maintenance, or gain.',
    type: 'website',
    url: 'https://calc-tech.com/calorie',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calorie Calculator - Calc-Tech.com',
    description: 'Calculate your daily calorie needs (TDEE) for weight loss, maintenance, or gain.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/calorie',
  },
};

export default function CalorieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
