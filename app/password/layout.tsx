import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator - Strong Random Passwords | Calc-Tech.com',
  description: 'Generate strong, random passwords with custom length and characters. Create secure passwords instantly with our free password generator.',
  keywords: 'password generator, strong password generator, random password, secure password creator, password maker, generate password',
  openGraph: {
    title: 'Password Generator - Calc-Tech.com',
    description: 'Generate strong, random passwords with custom length and characters.',
    type: 'website',
    url: 'https://calc-tech.com/password',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - Calc-Tech.com',
    description: 'Generate strong, random passwords with custom length and characters.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/password',
  },
};

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
