import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House Affordability Calculator - Free Online Home Affordability Tool | Calc-Tech.com',
  description: 'Calculate how much house you can afford based on your income and budget. Free online affordability calculator with detailed DTI ratios, monthly payment breakdowns, and expert guidance.',
  keywords: 'house affordability calculator, home affordability, how much house can I afford, mortgage affordability, DTI calculator, debt-to-income ratio, home buying calculator, mortgage calculator, house budget calculator',
  openGraph: {
    title: 'House Affordability Calculator - Calc-Tech.com',
    description: 'Calculate how much house you can afford based on your income and budget. Get instant results with detailed monthly payment breakdowns and DTI ratios.',
    type: 'website',
    url: 'https://calc-tech.com/house-affordability',
    images: [
      {
        url: '/og-house-affordability.png',
        width: 1200,
        height: 630,
        alt: 'House Affordability Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Affordability Calculator - Calc-Tech.com',
    description: 'Calculate how much house you can afford based on your income and budget. Free online tool with instant results.',
    images: ['/og-house-affordability.png']
  },
  alternates: {
    canonical: 'https://calc-tech.com/house-affordability'
  }
};
