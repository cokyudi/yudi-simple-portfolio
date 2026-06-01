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
    <div className='mx-auto max-w-4xl px-5 py-10'>
      <header className='mb-10'>
        <h1 className='text-4xl font-display font-bold text-fg'>
          {t.heading}
        </h1>
        <p className='mt-2 text-muted'>{t.subtitle}</p>
      </header>

      {filtered.length === 0 ? (
        <p className='text-muted'>{t.emptyState}</p>
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
