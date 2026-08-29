'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'next-view-transitions';
import BlogCard from '@/components/BlogCard';
import { trackBlogClick } from '@/constants/analytics';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import { useLatestPost } from '@/hooks/useLatestPost';
import type { BlogPostMeta } from '@/lib/posts';

type LatestPostProps = {
  posts: BlogPostMeta[];
};

/**
 * Homepage entry point into the blog. The card itself is a `BlogCard` so the
 * homepage and the blog index can't drift apart — this component only supplies
 * the section framing around it.
 */
export default function LatestPost({ posts }: LatestPostProps) {
  const { language } = useLanguage();
  const t = i18n[language].blog;
  const shouldReduceMotion = useReducedMotion();
  const post = useLatestPost(posts);

  if (!post) return null;

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

      <div className='mt-6'>
        <BlogCard
          {...post}
          lang={language}
          featured
          headingLevel='h3'
          onClick={() => trackBlogClick('home_featured', post.slug)}
        />
      </div>

      <Link
        href='/blog'
        onClick={() => trackBlogClick('home_view_all')}
        className='mt-5 inline-flex items-center font-display font-bold text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
      >
        {t.viewAllPosts}
      </Link>
    </motion.section>
  );
}
