import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Conversion Calculator - Length, Weight & More | Calc-Tech.com',
  description: 'Convert units of length, weight, volume, temperature, and more. A fast, free unit conversion calculator for everyday measurements.',
  keywords: 'unit conversion calculator, conversion calculator, length converter, weight converter, temperature converter, measurement converter',
  openGraph: {
    title: 'Unit Conversion Calculator - Calc-Tech.com',
    description: 'Convert units of length, weight, volume, temperature, and more.',
    type: 'website',
    url: 'https://calc-tech.com/conversion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Conversion Calculator - Calc-Tech.com',
    description: 'Convert units of length, weight, volume, temperature, and more.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/conversion',
  },
};

export default function ConversionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
