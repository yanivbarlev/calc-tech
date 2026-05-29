import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Budget Calculator - Monthly Budget Planner | Calc-Tech.com',
  description: 'Build a monthly budget by tracking income and expenses. See how much you can save and spend with the 50/30/20 rule using our budget calculator.',
  keywords: 'budget calculator, monthly budget planner, 50/30/20 rule, household budget, expense calculator, personal budget calculator',
  openGraph: {
    title: 'Budget Calculator - Calc-Tech.com',
    description: 'Build a monthly budget by tracking income and expenses with the 50/30/20 rule.',
    type: 'website',
    url: 'https://calc-tech.com/budget',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget Calculator - Calc-Tech.com',
    description: 'Build a monthly budget by tracking income and expenses with the 50/30/20 rule.',
  },
  alternates: {
    canonical: 'https://calc-tech.com/budget',
  },
};

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
