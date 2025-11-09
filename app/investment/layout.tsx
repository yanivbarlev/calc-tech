import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investment Calculator - Calculate Investment Returns & Growth | Calc-Tech.com',
  description: 'Free investment calculator to project portfolio growth with compound interest. Calculate future value with starting balance, regular contributions, return rates, and flexible compounding frequencies.',
  keywords: 'investment calculator, compound interest calculator, portfolio calculator, savings growth, investment returns, retirement calculator, wealth calculator, financial planning, online calculator, free calculator',
  openGraph: {
    title: 'Investment Calculator - Calc-Tech.com',
    description: 'Calculate investment growth with compound interest. Project future portfolio value with starting balance, contributions, and return rates. Free online tool with detailed schedules.',
    type: 'website',
    url: 'https://calc-tech.com/investment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Calculator - Calc-Tech.com',
    description: 'Calculate investment growth with compound interest. Project future portfolio value with starting balance, contributions, and return rates.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/investment'
  }
};

export default function InvestmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
