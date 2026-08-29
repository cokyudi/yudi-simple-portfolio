'use client';

import { Link } from 'next-view-transitions';
import { i18n, type Language } from '@/constants/i18n';
import { formatPostDate, formatReadingTime, formatTag } from '@/lib/format';
import type { BlogPostMeta } from '@/lib/posts';
import Badge from '@/components/ui/Badge';

/** Enough to signal what a post is about without crowding the card. */
const MAX_VISIBLE_TAGS = 3;

type BlogCardProps = BlogPostMeta & {
  lang: Language;
  /** Wider layout for the lead post on the blog index and the homepage. */
  featured?: boolean;
  /**
   * The card title is an `h2` under a page `h1`. Sections that introduce the
   * card with their own heading pass `h3` to keep the outline in order.
   */
  headingLevel?: 'h2' | 'h3';
  onClick?: () => void;
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
  headingLevel: Heading = 'h2',
  onClick,
  className = '',
}: BlogCardProps) {
  const t = i18n[lang].blog;

  return (
    <Link
      href={`/blog/${slug}`}
      aria-label={`${t.readPost}: ${title}`}
      onClick={onClick}
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
            <time dateTime={date}>{formatPostDate(date, lang)}</time>
          </Badge>
          <Badge variant='neutral'>{formatReadingTime(readingTime, lang)}</Badge>
        </div>

        <Heading
          className={`mt-2 font-display font-bold text-fg group-hover:text-accent transition-colors ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
          style={{ viewTransitionName: `post-title-${slug}` }}
        >
          {title}
        </Heading>

        <p
          className={`mt-3 text-muted ${
            featured ? 'md:text-lg' : 'text-sm line-clamp-3'
          }`}
        >
          {description}
        </p>

        {tags.length > 0 && (
          <ul className='mt-3 flex flex-wrap text-xs text-muted'>
            {tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
              <li
                key={tag}
                className='after:mx-2 after:content-["·"] last:after:content-none'
              >
                {formatTag(tag, lang)}
              </li>
            ))}
          </ul>
        )}

        <span className='mt-4 inline-block text-sm font-display font-bold text-accent group-hover:underline'>
          {t.readMore}
        </span>
      </article>
    </Link>
  );
}
