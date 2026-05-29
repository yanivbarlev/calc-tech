import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finance Calculator - Time Value of Money, Rates & Payments | Calc-Tech.com',
  description: 'Solve time value of money problems: present value, future value, payment, rate, and term. A flexible finance calculator for loans and investments.',
  keywords: 'finance calculator, time value of money calculator, TVM calculator, present value, future value, payment calculator, interest rate calculator',
  openGraph: {
    title: 'Finance Calculator - Calc-Tech.com',
    description: 'Solve time value of money problems: present value, future value, payment, rate, and term.',
    type: 'website',
    url: 'https://calc-tech.com/finance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance Calculator - Calc-Tech.com',
    description: 'Solve time value of money: present value, future value, payment, rate, and term.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/finance',
  },
};

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
