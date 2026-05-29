import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '401(k) Calculator - Estimate Retirement Savings Growth | Calc-Tech.com',
  description: 'Calculate how your 401(k) will grow with employer match, contributions, and compound returns. Project your retirement balance and plan contributions.',
  keywords: '401k calculator, 401(k) calculator, retirement calculator, employer match calculator, 401k growth, retirement savings calculator, contribution calculator',
  openGraph: {
    title: '401(k) Calculator - Calc-Tech.com',
    description: 'Calculate how your 401(k) will grow with employer match, contributions, and compound returns.',
    type: 'website',
    url: 'https://calc-tech.com/401k',
  },
  twitter: {
    card: 'summary_large_image',
    title: '401(k) Calculator - Calc-Tech.com',
    description: 'Project your 401(k) balance with employer match, contributions, and compound returns.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/401k',
  },
};

export default function Four01kLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
