import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conception Calculator - Estimate Conception Date | Calc-Tech.com',
  description: 'Estimate your conception date from your due date or last period. Find the likely date and fertile window with our conception calculator.',
  keywords: 'conception calculator, conception date calculator, when did i conceive, fertile window, ovulation calculator, pregnancy conception',
  openGraph: {
    title: 'Conception Calculator - Calc-Tech.com',
    description: 'Estimate your conception date from your due date or last period.',
    type: 'website',
    url: 'https://calc-tech.com/conception',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conception Calculator - Calc-Tech.com',
    description: 'Estimate your conception date from your due date or last period.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/conception',
  },
};

export default function ConceptionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
