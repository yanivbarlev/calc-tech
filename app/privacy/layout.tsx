import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Calc-Tech.com',
  description: 'Read the Calc-Tech privacy policy. Learn what data we collect, how it is used, and how we protect your privacy while using our free calculators.',
  keywords: 'calc-tech privacy policy, privacy, data policy, cookies policy',
  openGraph: {
    title: 'Privacy Policy - Calc-Tech.com',
    description: 'Read the Calc-Tech privacy policy and learn how we protect your privacy.',
    type: 'website',
    url: 'https://calc-tech.com/privacy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Calc-Tech.com',
    description: 'Read the Calc-Tech privacy policy and learn how we protect your privacy.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
