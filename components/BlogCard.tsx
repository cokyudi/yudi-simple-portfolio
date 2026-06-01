'use client';

import Link from 'next/link';
import { i18n } from '@/constants/i18n';
import { BlogPostMeta } from '@/lib/posts';

type BlogCardProps = BlogPostMeta & {
  lang: 'en' | 'ja';
};

export default function BlogCard({
  title,
  description,
  date,
  slug,
  lang,
}: BlogCardProps) {
  const locale = lang === 'ja' ? 'ja-JP' : 'en-US';
  const formatted = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

  return (
    <Link
      href={`/blog/${slug}`}
      aria-label={`Read blog post: ${title}`}
      className='group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper'
    >
      <article
        className='
          h-full flex flex-col
          border-2 border-ink bg-surface shadow-retro
          p-6
          transition-transform duration-150
          group-hover:-translate-x-0.5 group-hover:-translate-y-0.5
          group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none
        '
      >
        <time dateTime={date} className='text-sm text-muted'>
          {formatted}
        </time>

        <h2 className='mt-2 text-lg font-display font-bold text-fg group-hover:text-accent transition-colors'>
          {title}
        </h2>

        <p className='mt-3 text-sm text-muted line-clamp-3'>
          {description}
        </p>

        <span className='mt-4 inline-block text-sm font-display font-bold text-accent group-hover:underline'>
          {i18n[lang].blog.readMore}
        </span>
      </article>
    </Link>
  );
}
