import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Yudi Dharma Putra',
  description: 'Notes on learning, experiments, and experiences.',
  openGraph: {
    title: 'Blog | Yudi Dharma Putra',
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

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <header className='mb-10'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Blog
        </h1>
        <p className='mt-2 text-gray-800 dark:text-gray-100'>
          Notes on learning, experiments, and experiences.
        </p>
      </header>

      <section
        aria-label='Blog posts'
        className='
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
        '
      >
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </section>
    </main>
  );
}