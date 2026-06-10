import { getAllPosts } from '@/lib/posts';
import BlogGrid from '@/components/BlogGrid';
import { OG_VERSION } from '@/constants/og';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on learning, experiments, and experiences.',
  openGraph: {
    title: 'Blog',
    description: 'Notes on learning, experiments, and experiences.',
    url: '/blog',
    images: [`/og/blog?v=${OG_VERSION}`],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og/blog?v=${OG_VERSION}`],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogGrid allPosts={posts} />;
}