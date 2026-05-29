import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scientific Calculator - Free Online Advanced Calculator | Calc-Tech.com',
  description: 'Free online scientific calculator with trig, logarithms, exponents, and more. Perform advanced math calculations right in your browser.',
  keywords: 'scientific calculator, online scientific calculator, advanced calculator, trigonometry calculator, logarithm calculator, exponent calculator',
  openGraph: {
    title: 'Scientific Calculator - Calc-Tech.com',
    description: 'Free online scientific calculator with trig, logarithms, exponents, and more.',
    type: 'website',
    url: 'https://calc-tech.com/scientific',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scientific Calculator - Calc-Tech.com',
    description: 'Free online scientific calculator with trig, logarithms, exponents, and more.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/scientific',
  },
};

export default function ScientificLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
