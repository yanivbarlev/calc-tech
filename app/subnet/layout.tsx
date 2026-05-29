import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subnet Calculator - IP Subnet & CIDR | Calc-Tech.com',
  description: 'Calculate subnet masks, network and broadcast addresses, host ranges, and CIDR. A free IP subnet calculator for network planning.',
  keywords: 'subnet calculator, ip subnet calculator, cidr calculator, subnet mask calculator, network calculator, ipv4 subnet',
  openGraph: {
    title: 'Subnet Calculator - Calc-Tech.com',
    description: 'Calculate subnet masks, network and broadcast addresses, host ranges, and CIDR.',
    type: 'website',
    url: 'https://calc-tech.com/subnet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subnet Calculator - Calc-Tech.com',
    description: 'Calculate subnet masks, network and broadcast addresses, and CIDR.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/subnet',
  },
};

export default function SubnetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
