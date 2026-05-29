import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GPA Calculator - Calculate Your Grade Point Average | Calc-Tech.com',
  description: 'Calculate your GPA from course grades and credit hours. Supports weighted and unweighted scales with our free GPA calculator.',
  keywords: 'gpa calculator, grade point average calculator, weighted gpa, unweighted gpa, college gpa calculator, high school gpa',
  openGraph: {
    title: 'GPA Calculator - Calc-Tech.com',
    description: 'Calculate your GPA from course grades and credit hours. Weighted and unweighted.',
    type: 'website',
    url: 'https://calc-tech.com/gpa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPA Calculator - Calc-Tech.com',
    description: 'Calculate your GPA from course grades and credit hours. Weighted and unweighted.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/gpa',
  },
};

export default function GpaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
