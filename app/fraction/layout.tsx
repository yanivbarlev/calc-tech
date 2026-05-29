import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fraction Calculator - Add, Subtract, Multiply & Divide | Calc-Tech.com',
  description: 'Add, subtract, multiply, and divide fractions with step-by-step results. Simplify fractions and convert to decimals with our fraction calculator.',
  keywords: 'fraction calculator, add fractions, subtract fractions, multiply fractions, divide fractions, simplify fractions, fraction to decimal',
  openGraph: {
    title: 'Fraction Calculator - Calc-Tech.com',
    description: 'Add, subtract, multiply, and divide fractions with step-by-step results.',
    type: 'website',
    url: 'https://calc-tech.com/fraction',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fraction Calculator - Calc-Tech.com',
    description: 'Add, subtract, multiply, and divide fractions with step-by-step results.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/fraction',
  },
};

export default function FractionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
