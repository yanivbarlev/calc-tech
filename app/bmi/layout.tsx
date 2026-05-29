import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI Calculator - Body Mass Index & Healthy Weight | Calc-Tech.com',
  description: 'Calculate your Body Mass Index (BMI) and find your healthy weight range. Free BMI calculator with metric and imperial units and category guidance.',
  keywords: 'bmi calculator, body mass index calculator, healthy weight calculator, bmi chart, bmi for men, bmi for women, ideal weight range',
  openGraph: {
    title: 'BMI Calculator - Calc-Tech.com',
    description: 'Calculate your Body Mass Index (BMI) and find your healthy weight range.',
    type: 'website',
    url: 'https://calc-tech.com/bmi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator - Calc-Tech.com',
    description: 'Calculate your Body Mass Index (BMI) and find your healthy weight range.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/bmi',
  },
};

export default function BmiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
