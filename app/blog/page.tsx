import { getAllPosts } from '@/lib/posts';
import BlogGrid from '@/components/BlogGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on learning, experiments, and experiences.',
  openGraph: {
    title: 'Blog',
    description: 'Notes on learning, experiments, and experiences.',
    url: '/blog',
    images: ['/og/blog'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/blog'],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogGrid allPosts={posts} />;
}