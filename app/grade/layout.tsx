import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grade Calculator - Final Grade & Weighted Average | Calc-Tech.com',
  description: 'Calculate your current grade, weighted average, and the score needed on a final exam. A free grade calculator for students.',
  keywords: 'grade calculator, final grade calculator, weighted grade calculator, test grade calculator, what do i need on my final, class grade',
  openGraph: {
    title: 'Grade Calculator - Calc-Tech.com',
    description: 'Calculate your current grade, weighted average, and the score needed on a final.',
    type: 'website',
    url: 'https://calc-tech.com/grade',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grade Calculator - Calc-Tech.com',
    description: 'Calculate your current grade, weighted average, and the score needed on a final.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/grade',
  },
};

export default function GradeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
