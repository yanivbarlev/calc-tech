import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Date Calculator - Days Between Dates & Add/Subtract | Calc-Tech.com',
  description: 'Calculate the number of days between two dates or add and subtract days from a date. A free date calculator for planning and deadlines.',
  keywords: 'date calculator, days between dates, add days to date, subtract days from date, date difference calculator, days until calculator',
  openGraph: {
    title: 'Date Calculator - Calc-Tech.com',
    description: 'Calculate days between two dates or add and subtract days from a date.',
    type: 'website',
    url: 'https://calc-tech.com/date',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Calculator - Calc-Tech.com',
    description: 'Calculate days between two dates or add and subtract days from a date.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/date',
  },
};

export default function DateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
