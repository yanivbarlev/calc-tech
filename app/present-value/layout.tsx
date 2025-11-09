import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Present Value Calculator - Calculate PV of Future Money & Payments | Calc-Tech.com',
  description: 'Free present value calculator to determine current worth of future money or periodic payments. Calculate PV, NPV, and understand time value of money with detailed schedules and comprehensive explanations.',
  keywords: 'present value calculator, pv calculator, npv calculator, time value of money, discount rate calculator, annuity calculator, future value calculator, financial calculator, online calculator, free calculator',
  openGraph: {
    title: 'Present Value Calculator - Calc-Tech.com',
    description: 'Calculate present value of future lump sums or periodic payments. Understand time value of money with detailed payment schedules and comprehensive financial insights.',
    type: 'website',
    url: 'https://calc-tech.com/present-value',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Present Value Calculator - Calc-Tech.com',
    description: 'Calculate present value of future lump sums or periodic payments. Understand time value of money with detailed payment schedules.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/present-value'
  }
};

export default function PresentValueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
