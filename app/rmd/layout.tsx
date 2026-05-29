import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RMD Calculator - Required Minimum Distribution | Calc-Tech.com',
  description: 'Calculate your required minimum distribution (RMD) from IRAs and 401(k)s by age using IRS life expectancy tables. Avoid costly RMD penalties.',
  keywords: 'rmd calculator, required minimum distribution, ira rmd, 401k rmd, retirement withdrawal calculator, IRS life expectancy table',
  openGraph: {
    title: 'RMD Calculator - Calc-Tech.com',
    description: 'Calculate your required minimum distribution (RMD) from IRAs and 401(k)s by age.',
    type: 'website',
    url: 'https://calc-tech.com/rmd',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RMD Calculator - Calc-Tech.com',
    description: 'Calculate your required minimum distribution (RMD) from IRAs and 401(k)s by age.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/rmd',
  },
};

export default function RmdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
