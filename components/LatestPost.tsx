'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { sendGTMEvent } from '@next/third-parties/google';
import { Link } from 'next-view-transitions';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import type { BlogPostMeta } from '@/lib/posts';

type LatestPostProps = {
  post: BlogPostMeta;
};

export default function LatestPost({ post }: LatestPostProps) {
  const { language } = useLanguage();
  const t = i18n[language].blog;
  const shouldReduceMotion = useReducedMotion();

  const locale = language === 'ja' ? 'ja-JP' : 'en-US';
  const formatted = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.date));

  return (
    <motion.section
      className='max-w-5xl mx-auto mt-16 lg:mt-24 px-5'
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className='text-2xl md:text-3xl font-display font-bold text-fg'>
        {t.latestFromBlog}
      </h2>

      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read blog post: ${post.title}`}
        onClick={() =>
          sendGTMEvent({ event: 'blog_click', location: 'home_featured', slug: post.slug })
        }
        className='group mt-6 block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper'
      >
        <article
          className='
            border-2 border-ink bg-surface shadow-retro
            p-6 md:p-8
            transition-transform duration-150
            group-hover:-translate-x-0.5 group-hover:-translate-y-0.5
            group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none
          '
        >
          <Badge
            variant='highlight'
            className='self-start'
            style={{ viewTransitionName: `post-date-${post.slug}` }}
          >
            <time dateTime={post.date}>{formatted}</time>
          </Badge>

          <h3
            className='mt-3 text-2xl md:text-3xl font-display font-bold text-fg group-hover:text-accent transition-colors'
            style={{ viewTransitionName: `post-title-${post.slug}` }}
          >
            {post.title}
          </h3>

          <p className='mt-3 text-muted md:text-lg'>{post.description}</p>

          <span className='mt-5 inline-block font-display font-bold text-accent group-hover:underline'>
            {t.readMore}
          </span>
        </article>
      </Link>

      <Link
        href='/blog'
        onClick={() => sendGTMEvent({ event: 'blog_click', location: 'home_view_all' })}
        className='mt-5 inline-flex items-center font-display font-bold text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
      >
        {t.viewAllPosts}
      </Link>
    </motion.section>
  );
}
