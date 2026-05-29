import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Calculator - Age in Years, Months & Days | Calc-Tech.com',
  description: 'Calculate exact age in years, months, weeks, and days from any birth date. Find the age between two dates with our free age calculator.',
  keywords: 'age calculator, calculate age, age in years months days, date of birth calculator, how old am i, age difference calculator',
  openGraph: {
    title: 'Age Calculator - Calc-Tech.com',
    description: 'Calculate exact age in years, months, weeks, and days from any birth date.',
    type: 'website',
    url: 'https://calc-tech.com/age',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator - Calc-Tech.com',
    description: 'Calculate exact age in years, months, weeks, and days from any birth date.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/age',
  },
};

export default function AgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
