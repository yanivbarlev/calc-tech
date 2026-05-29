import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Concrete Calculator - Estimate Concrete & Bags | Calc-Tech.com',
  description: 'Calculate how much concrete you need for slabs, footings, and columns. Estimate cubic yards and bags with our free concrete calculator.',
  keywords: 'concrete calculator, concrete yardage calculator, bags of concrete, slab concrete calculator, cubic yards of concrete, footing calculator',
  openGraph: {
    title: 'Concrete Calculator - Calc-Tech.com',
    description: 'Calculate how much concrete you need for slabs, footings, and columns.',
    type: 'website',
    url: 'https://calc-tech.com/concrete',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concrete Calculator - Calc-Tech.com',
    description: 'Calculate how much concrete you need for slabs, footings, and columns.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/concrete',
  },
};

export default function ConcreteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
