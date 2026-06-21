import type { Metadata } from 'next';
import Uses from '@/components/Uses';

export const metadata: Metadata = {
  title: 'Uses',
  description: 'The tools, apps, and gear Yudi Dharma Putra uses day to day.',
  alternates: {
    canonical: '/uses',
  },
};

export default function UsesPage() {
  return <Uses />;
}
