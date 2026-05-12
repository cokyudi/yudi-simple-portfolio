'use client';

import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import BlogCard from '@/components/BlogCard';
import type { BlogPostMeta } from '@/lib/posts';

type BlogGridProps = {
  allPosts: BlogPostMeta[];
};

export default function BlogGrid({ allPosts }: BlogGridProps) {
  const { language } = useLanguage();
  const t = i18n[language].blog;
  const filtered = allPosts.filter((p) => p.lang === language);

  return (
    <div className='mx-auto max-w-4xl px-4 py-10'>
      <header className='mb-10'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          {t.heading}
        </h1>
        <p className='mt-2 text-gray-800 dark:text-gray-100'>{t.subtitle}</p>
      </header>

      {filtered.length === 0 ? (
        <p className='text-gray-500 dark:text-gray-400'>{t.emptyState}</p>
      ) : (
        <section
          aria-label='Blog posts'
          className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        >
          {filtered.map((post) => (
            <BlogCard key={post.slug} {...post} lang={language} />
          ))}
        </section>
      )}
    </div>
  );
}
