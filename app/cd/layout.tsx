import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CD Calculator - Free Certificate of Deposit Calculator | Calc-Tech.com',
  description: 'Calculate your certificate of deposit returns with our free CD calculator. Compare interest rates, compounding frequencies, and CD terms to maximize your savings. FDIC-insured investment planning made simple.',
  keywords: 'CD calculator, certificate of deposit calculator, CD interest calculator, savings calculator, CD rate calculator, compound interest, APY calculator, time deposit calculator, fixed deposit calculator',
  openGraph: {
    title: 'CD Calculator - Certificate of Deposit Calculator | Calc-Tech.com',
    description: 'Calculate your certificate of deposit returns with different interest rates and compounding frequencies. Free, accurate, and easy to use.',
    type: 'website',
    url: 'https://calc-tech.com/cd',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CD Calculator - Calc-Tech.com',
    description: 'Calculate your certificate of deposit returns with different interest rates and compounding frequencies.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/cd'
  }
};

export default function CDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
