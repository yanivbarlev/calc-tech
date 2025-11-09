import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retirement Calculator - Free Online Retirement Planning Tool | Calc-Tech.com',
  description: 'Plan your retirement with our comprehensive calculator. Estimate retirement needs, calculate savings goals, determine safe withdrawal rates, and see how long your money will last. Free retirement planning tool.',
  keywords: 'retirement calculator, retirement planning, retirement savings, 401k calculator, IRA calculator, pension calculator, retirement income, withdrawal rate, 4% rule, retirement goals',
  openGraph: {
    title: 'Retirement Calculator - Calc-Tech.com',
    description: 'Plan your retirement with our comprehensive calculator. Estimate retirement needs, calculate savings goals, and determine safe withdrawal rates.',
    type: 'website',
    url: 'https://calc-tech.com/retirement',
    images: [
      {
        url: '/og-image-retirement.png',
        width: 1200,
        height: 630,
        alt: 'Retirement Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Calculator - Calc-Tech.com',
    description: 'Plan your retirement with our comprehensive calculator. Estimate retirement needs, calculate savings goals, and determine safe withdrawal rates.',
    images: ['/og-image-retirement.png']
  },
  alternates: {
    canonical: 'https://calc-tech.com/retirement'
  }
};
