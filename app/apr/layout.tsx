import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'APR Calculator - Free Annual Percentage Rate Calculator | Calc-Tech.com',
  description: 'Calculate the true Annual Percentage Rate (APR) of any loan including all fees and charges. Compare real APR vs nominal interest rate with our free calculator.',
  keywords: 'apr calculator, annual percentage rate, apr vs interest rate, loan apr, real apr calculator, effective apr, loan cost calculator',
  openGraph: {
    title: 'APR Calculator - Calc-Tech.com',
    description: 'Calculate the true Annual Percentage Rate (APR) of any loan including all fees and charges. Free and easy to use.',
    type: 'website',
    url: 'https://calc-tech.com/apr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APR Calculator - Calc-Tech.com',
    description: 'Calculate the true Annual Percentage Rate (APR) of any loan including all fees and charges.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/apr'
  }
};

export default function APRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
