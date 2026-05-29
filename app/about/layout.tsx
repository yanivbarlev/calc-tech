import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Calc-Tech - Free Online Calculators & Tools',
  description: 'Learn about Calc-Tech, a free collection of fast, accurate online calculators for finance, health, math, and everyday needs. No sign-up required.',
  keywords: 'about calc-tech, free online calculators, calculator website, calc-tech tools',
  openGraph: {
    title: 'About Calc-Tech',
    description: 'Learn about Calc-Tech, a free collection of fast, accurate online calculators.',
    type: 'website',
    url: 'https://calc-tech.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Calc-Tech',
    description: 'Learn about Calc-Tech, a free collection of fast, accurate online calculators.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
