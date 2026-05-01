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
      className='group h-full'
    >
      <article
        className='
          h-full
          rounded-xl border border-gray-200 dark:border-gray-800
          bg-white dark:bg-black
          p-6
          transition
          hover:-translate-y-1
          hover:shadow-lg
        '
      >
        <time
          dateTime={date}
          className='text-sm text-gray-800 dark:text-gray-200'
        >
          {formatted}
        </time>

        <h2 className='mt-2 text-lg font-semibold text-gray-900 dark:text-white'>
          {title}
        </h2>

        <p className='mt-3 text-sm text-gray-800 dark:text-gray-200 line-clamp-3'>
          {description}
        </p>

        <span className='mt-4 inline-block text-sm font-medium text-teal-500 dark:text-teal-300 group-hover:underline'>
          {i18n[lang].blog.readMore}
        </span>
      </article>
    </Link>
  );
}
