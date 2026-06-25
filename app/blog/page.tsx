import { getAllPosts } from '@/lib/posts';
import BlogGrid from '@/components/BlogGrid';
import { OG_VERSION } from '@/constants/og';
import { SITE_URL } from '@/constants/site';
import { breadcrumbSchema, jsonLdGraph, PERSON_ID, BLOG_ID } from '@/lib/jsonld';
import type { Metadata } from 'next';

const description = 'Notes on learning, experiments, and experiences.';

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog',
    description,
    url: '/blog',
    images: [`/og/blog?v=${OG_VERSION}`],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og/blog?v=${OG_VERSION}`],
  },
};

const blogSchema = {
  '@type': 'Blog',
  '@id': BLOG_ID,
  url: `${SITE_URL}/blog`,
  name: 'Blog',
  description,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

const breadcrumb = breadcrumbSchema([
  { name: 'Home', url: SITE_URL },
  { name: 'Blog', url: `${SITE_URL}/blog` },
]);

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: jsonLdGraph(breadcrumb, blogSchema) }}
      />
      <BlogGrid allPosts={posts} />
    </>
  );
}
