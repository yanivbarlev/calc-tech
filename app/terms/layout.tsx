import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use - Calc-Tech.com',
  description: 'Read the Calc-Tech terms of use governing access to our free online calculators and tools. Understand your rights and responsibilities.',
  keywords: 'calc-tech terms of use, terms and conditions, terms of service',
  openGraph: {
    title: 'Terms of Use - Calc-Tech.com',
    description: 'Read the Calc-Tech terms of use for our free online calculators and tools.',
    type: 'website',
    url: 'https://calc-tech.com/terms',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use - Calc-Tech.com',
    description: 'Read the Calc-Tech terms of use for our free online calculators and tools.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
