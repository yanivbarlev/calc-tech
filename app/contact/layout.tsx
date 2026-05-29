import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Calc-Tech - Get in Touch',
  description: 'Contact the Calc-Tech team with questions, feedback, or calculator suggestions. We are here to help you get the most from our free tools.',
  keywords: 'contact calc-tech, calc-tech support, feedback, calculator suggestions',
  openGraph: {
    title: 'Contact Calc-Tech',
    description: 'Contact the Calc-Tech team with questions, feedback, or calculator suggestions.',
    type: 'website',
    url: 'https://calc-tech.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Calc-Tech',
    description: 'Contact the Calc-Tech team with questions, feedback, or calculator suggestions.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
