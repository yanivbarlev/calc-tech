import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Body Fat Calculator - Estimate Body Fat Percentage | Calc-Tech.com',
  description: 'Estimate your body fat percentage using the U.S. Navy method and body measurements. Track fitness progress with our free body fat calculator.',
  keywords: 'body fat calculator, body fat percentage, navy body fat calculator, body composition, fat percentage calculator, lean mass',
  openGraph: {
    title: 'Body Fat Calculator - Calc-Tech.com',
    description: 'Estimate your body fat percentage using the U.S. Navy method and body measurements.',
    type: 'website',
    url: 'https://calc-tech.com/body-fat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Calculator - Calc-Tech.com',
    description: 'Estimate your body fat percentage using the U.S. Navy method.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/body-fat',
  },
};

export default function BodyFatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
