import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Standard Deviation Calculator - Variance & Mean | Calc-Tech.com',
  description: 'Calculate standard deviation, variance, mean, and sum for any data set. Supports population and sample data with step-by-step results.',
  keywords: 'standard deviation calculator, variance calculator, mean calculator, sample standard deviation, population standard deviation, statistics calculator',
  openGraph: {
    title: 'Standard Deviation Calculator - Calc-Tech.com',
    description: 'Calculate standard deviation, variance, mean, and sum for any data set.',
    type: 'website',
    url: 'https://calc-tech.com/standard-deviation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Standard Deviation Calculator - Calc-Tech.com',
    description: 'Calculate standard deviation, variance, mean, and sum for any data set.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/standard-deviation',
  },
};

export default function StandardDeviationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
