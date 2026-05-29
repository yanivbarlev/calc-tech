import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap - All Calculators & Tools | Calc-Tech.com',
  description: 'Browse every calculator and tool on Calc-Tech in one place. Find finance, health, math, and utility calculators from our complete sitemap.',
  keywords: 'calc-tech sitemap, all calculators, calculator list, calc-tech tools, site map',
  openGraph: {
    title: 'Sitemap - Calc-Tech.com',
    description: 'Browse every calculator and tool on Calc-Tech in one place.',
    type: 'website',
    url: 'https://calc-tech.com/site-map',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitemap - Calc-Tech.com',
    description: 'Browse every calculator and tool on Calc-Tech in one place.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/site-map',
  },
};

export default function SiteMapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
