import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simple Interest Calculator - Free Online Financial Tool | Calc-Tech.com',
  description: 'Calculate simple interest earnings and ending balance with our free online calculator. Easy-to-use tool with detailed explanations of simple interest formulas and real-world examples.',
  keywords: 'simple interest calculator, simple interest, interest calculator, online calculator, free calculator, financial calculator, interest formula, loan calculator, savings calculator',
  openGraph: {
    title: 'Simple Interest Calculator - Calc-Tech.com',
    description: 'Calculate simple interest earnings and ending balance with our free online calculator. Easy-to-use tool with detailed explanations of simple interest formulas and real-world examples.',
    type: 'website',
    url: 'https://calc-tech.com/simple-interest',
    images: [
      {
        url: '/og-image-simple-interest.png',
        width: 1200,
        height: 630,
        alt: 'Simple Interest Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple Interest Calculator - Calc-Tech.com',
    description: 'Calculate simple interest earnings and ending balance with our free online calculator. Easy-to-use tool with detailed explanations of simple interest formulas and real-world examples.',
    images: ['/og-image-simple-interest.png']
  },
  alternates: {
    canonical: 'https://calc-tech.com/simple-interest'
  }
};

export default function SimpleInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
