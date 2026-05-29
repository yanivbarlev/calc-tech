import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Triangle Calculator - Sides, Angles & Area | Calc-Tech.com',
  description: 'Solve any triangle from sides and angles. Calculate area, perimeter, and missing values with our free triangle calculator.',
  keywords: 'triangle calculator, triangle area calculator, right triangle calculator, solve triangle, triangle sides and angles, trigonometry',
  openGraph: {
    title: 'Triangle Calculator - Calc-Tech.com',
    description: 'Solve any triangle from sides and angles. Calculate area, perimeter, and missing values.',
    type: 'website',
    url: 'https://calc-tech.com/triangle',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Triangle Calculator - Calc-Tech.com',
    description: 'Solve any triangle from sides and angles. Calculate area, perimeter, and more.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/triangle',
  },
};

export default function TriangleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
