import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Due Date Calculator - Pregnancy Due Date Estimator | Calc-Tech.com',
  description: 'Calculate your pregnancy due date from your last menstrual period or conception date. Track your trimester and key pregnancy milestones.',
  keywords: 'due date calculator, pregnancy due date, estimated due date, EDD calculator, pregnancy calculator, last menstrual period',
  openGraph: {
    title: 'Due Date Calculator - Calc-Tech.com',
    description: 'Calculate your pregnancy due date from your last period or conception date.',
    type: 'website',
    url: 'https://calc-tech.com/due-date',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Due Date Calculator - Calc-Tech.com',
    description: 'Calculate your pregnancy due date from your last period or conception date.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/due-date',
  },
};

export default function DueDateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
