import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hours Calculator - Work Hours & Time Card | Calc-Tech.com',
  description: 'Calculate total work hours and pay from clock-in and clock-out times. A free hours calculator with breaks for timesheets and payroll.',
  keywords: 'hours calculator, work hours calculator, time card calculator, timesheet calculator, hours worked, payroll hours calculator',
  openGraph: {
    title: 'Hours Calculator - Calc-Tech.com',
    description: 'Calculate total work hours and pay from clock-in and clock-out times.',
    type: 'website',
    url: 'https://calc-tech.com/hours',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hours Calculator - Calc-Tech.com',
    description: 'Calculate total work hours and pay from clock-in and clock-out times.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/hours',
  },
};

export default function HoursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
