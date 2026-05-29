import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROI Calculator - Return on Investment | Calc-Tech.com',
  description: 'Calculate return on investment (ROI), net profit, and annualized return. Compare investments and measure the performance of any project.',
  keywords: 'roi calculator, return on investment calculator, investment return, annualized return, profit calculator, ROI percentage',
  openGraph: {
    title: 'ROI Calculator - Calc-Tech.com',
    description: 'Calculate return on investment (ROI), net profit, and annualized return.',
    type: 'website',
    url: 'https://calc-tech.com/roi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator - Calc-Tech.com',
    description: 'Calculate return on investment (ROI), net profit, and annualized return.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/roi',
  },
};

export default function RoiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
