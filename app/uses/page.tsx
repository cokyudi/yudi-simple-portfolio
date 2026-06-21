import type { Metadata } from 'next';
import Uses from '@/components/Uses';
import { OG_VERSION } from '@/constants/og';

const description = 'The tools, apps, and gear Yudi Dharma Putra uses day to day.';

export const metadata: Metadata = {
  title: 'Uses',
  description,
  alternates: {
    canonical: '/uses',
  },
  openGraph: {
    type: 'website',
    title: 'Uses | Yudi Dharma Putra',
    description,
    url: '/uses',
    images: [`/og/uses?v=${OG_VERSION}`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uses | Yudi Dharma Putra',
    description,
    images: [`/og/uses?v=${OG_VERSION}`],
  },
};

export default function UsesPage() {
  return <Uses />;
}
