import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Calculator - Add & Subtract Hours and Minutes | Calc-Tech.com',
  description: 'Add or subtract time in hours, minutes, and seconds. Calculate the duration between two times with our free time calculator.',
  keywords: 'time calculator, add time calculator, subtract time, hours and minutes calculator, time duration calculator, elapsed time',
  openGraph: {
    title: 'Time Calculator - Calc-Tech.com',
    description: 'Add or subtract time in hours, minutes, and seconds and calculate duration.',
    type: 'website',
    url: 'https://calc-tech.com/time',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Calculator - Calc-Tech.com',
    description: 'Add or subtract time in hours, minutes, and seconds and calculate duration.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/time',
  },
};

export default function TimeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
