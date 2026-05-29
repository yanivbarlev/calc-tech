import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roth IRA Calculator - Tax-Free Retirement Growth | Calc-Tech.com',
  description: 'Project your Roth IRA balance at retirement with annual contributions and compound growth. See your tax-free savings potential over time.',
  keywords: 'roth ira calculator, roth ira growth, retirement calculator, tax-free retirement, ira contribution calculator, roth ira savings',
  openGraph: {
    title: 'Roth IRA Calculator - Calc-Tech.com',
    description: 'Project your Roth IRA balance at retirement with annual contributions and compound growth.',
    type: 'website',
    url: 'https://calc-tech.com/roth-ira',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roth IRA Calculator - Calc-Tech.com',
    description: 'Project your Roth IRA balance with annual contributions and tax-free compound growth.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/roth-ira',
  },
};

export default function RothIraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
