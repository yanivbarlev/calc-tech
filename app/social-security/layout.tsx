import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Security Calculator - Estimate Your Benefits | Calc-Tech.com',
  description: 'Estimate your Social Security retirement benefits based on earnings and claiming age. See how filing early or late changes your monthly check.',
  keywords: 'social security calculator, social security benefits, retirement benefits calculator, claiming age, SSA benefit estimate, social security retirement',
  openGraph: {
    title: 'Social Security Calculator - Calc-Tech.com',
    description: 'Estimate your Social Security retirement benefits based on earnings and claiming age.',
    type: 'website',
    url: 'https://calc-tech.com/social-security',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Security Calculator - Calc-Tech.com',
    description: 'Estimate your Social Security benefits and see how claiming age changes your check.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/social-security',
  },
};

export default function SocialSecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
