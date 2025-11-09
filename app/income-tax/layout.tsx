import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Income Tax Calculator - Free Online Tax Estimator 2024 | Calc-Tech.com',
  description: 'Calculate your federal and state income taxes, FICA contributions, and take-home pay. Accurate tax calculator with 2024 tax brackets, deductions, and detailed breakdowns.',
  keywords: 'income tax calculator, tax calculator, federal tax, state tax, FICA calculator, tax estimator, take home pay calculator, paycheck calculator, 2024 tax brackets',
  openGraph: {
    title: 'Income Tax Calculator - Calc-Tech.com',
    description: 'Calculate your federal and state income taxes, FICA contributions, and take-home pay with our comprehensive 2024 tax calculator.',
    type: 'website',
    url: 'https://calc-tech.com/income-tax',
    images: [
      {
        url: '/og-image-income-tax.png',
        width: 1200,
        height: 630,
        alt: 'Income Tax Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Income Tax Calculator - Calc-Tech.com',
    description: 'Calculate your federal and state income taxes, FICA contributions, and take-home pay with our comprehensive 2024 tax calculator.',
    images: ['/og-image-income-tax.png']
  },
  alternates: {
    canonical: 'https://calc-tech.com/income-tax'
  }
};

export default function IncomeTaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
