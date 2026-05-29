import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary Calculator - Hourly, Annual & Take-Home Pay | Calc-Tech.com',
  description: 'Convert between hourly, weekly, monthly, and annual salary. Estimate take-home pay and compare job offers with our free salary calculator.',
  keywords: 'salary calculator, hourly to salary, annual salary calculator, take home pay calculator, paycheck calculator, wage calculator',
  openGraph: {
    title: 'Salary Calculator - Calc-Tech.com',
    description: 'Convert between hourly, weekly, monthly, and annual salary and estimate take-home pay.',
    type: 'website',
    url: 'https://calc-tech.com/salary',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary Calculator - Calc-Tech.com',
    description: 'Convert between hourly, weekly, monthly, and annual salary and estimate take-home pay.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/salary',
  },
};

export default function SalaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
