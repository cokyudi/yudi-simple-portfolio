'use client';

import { Link } from 'next-view-transitions';
import { i18n } from '@/constants/i18n';
import { BlogPostMeta } from '@/lib/posts';
import Badge from '@/components/ui/Badge';

type BlogCardProps = BlogPostMeta & {
  lang: 'en' | 'ja';
  // The newest post on the index spans the full grid row.
  featured?: boolean;
  className?: string;
};

export default function BlogCard({
  title,
  description,
  date,
  slug,
  tags,
  readingTime,
  lang,
  featured = false,
  className = '',
}: BlogCardProps) {
  const t = i18n[lang].blog;
  const locale = lang === 'ja' ? 'ja-JP' : 'en-US';
  const formatted = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

  // JA sets the unit tight against the number ("4分で読む"); EN needs a space.
  const readLabel =
    lang === 'ja' ? `${readingTime}${t.minRead}` : `${readingTime} ${t.minRead}`;

  // Tag slugs are language-neutral; the map turns them into display labels and
  // falls back to the raw slug for any tag not yet added to constants/i18n.ts.
  const tagLabels: Record<string, string> = i18n[lang].tags;

  return (
    <Link
      href={`/blog/${slug}`}
      aria-label={`Read blog post: ${title}`}
      className={`group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${className}`}
    >
      <article
        className={`
          h-full flex flex-col
          border-2 border-ink bg-surface shadow-retro
          ${featured ? 'p-6 md:p-8' : 'p-6'}
          transition-transform duration-150
          group-hover:-translate-x-0.5 group-hover:-translate-y-0.5
          group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none
        `}
      >
        <div className='flex flex-wrap items-center gap-2'>
          <Badge
            variant='highlight'
            style={{ viewTransitionName: `post-date-${slug}` }}
          >
            <time dateTime={date}>{formatted}</time>
          </Badge>
          <Badge variant='neutral'>{readLabel}</Badge>
        </div>

        <h2
          className={`mt-2 font-display font-bold text-fg group-hover:text-accent transition-colors ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
          style={{ viewTransitionName: `post-title-${slug}` }}
        >
          {title}
        </h2>

        <p
          className={`mt-3 text-muted ${
            featured ? 'md:text-lg' : 'text-sm line-clamp-3'
          }`}
        >
          {description}
        </p>

        {tags.length > 0 && (
          <p className='mt-3 text-xs text-muted'>
            {tags.slice(0, 3).map((tag) => tagLabels[tag] ?? tag).join(' · ')}
          </p>
        )}

        <span className='mt-4 inline-block text-sm font-display font-bold text-accent group-hover:underline'>
          {t.readMore}
        </span>
      </article>
    </Link>
  );
}
