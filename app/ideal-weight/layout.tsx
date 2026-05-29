import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ideal Weight Calculator - Healthy Weight by Height | Calc-Tech.com',
  description: 'Find your ideal body weight based on height, age, and gender using established formulas. Set a realistic, healthy weight target.',
  keywords: 'ideal weight calculator, ideal body weight, healthy weight by height, target weight calculator, IBW calculator, weight goal',
  openGraph: {
    title: 'Ideal Weight Calculator - Calc-Tech.com',
    description: 'Find your ideal body weight based on height, age, and gender using proven formulas.',
    type: 'website',
    url: 'https://calc-tech.com/ideal-weight',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideal Weight Calculator - Calc-Tech.com',
    description: 'Find your ideal body weight based on height, age, and gender.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/ideal-weight',
  },
};

export default function IdealWeightLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
