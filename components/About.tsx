'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  trackBlogClick,
  trackContactClick,
  trackCvDownload,
} from '@/constants/analytics';
import profile from '@/public/yudi-draw.jpg';
import { Link } from 'next-view-transitions';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import ContactCTA from '@/components/ContactCTA';
import LatestPost from '@/components/LatestPost';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import { userData } from '@/constants/data';
import type { BlogPostMeta } from '@/lib/posts';

type AboutProps = {
  posts: BlogPostMeta[];
};

export default function About({ posts }: AboutProps) {
  const { language } = useLanguage();
  const t = i18n[language].about;
  const shouldReduceMotion = useReducedMotion();

  // `posts` arrives sorted newest-first, so the first match is the latest post
  // in the active language. Undefined when a language has no posts yet.
  const latest = posts.find((p) => p.lang === language);

  const textVariants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  }

  return (
    <div className='container px-5'>
      <div className='max-w-5xl mx-auto lg:space-x-5 lg:flex lg:flex-row items-center lg:-mx-4 flex flex-col text-center lg:text-left'>
        <div className='flex-shrink-0 lg:mt-12 lg:px-4 mb-10 ml-auto mr-auto'>
          <Image
            src={profile}
            alt='profile photo of Yudi Dharma Putra'
            priority
            className='rounded-full border-2 border-ink shadow-retro'
            width={250}
            height={250}
            placeholder='blur'
            sizes="250px"
            quality={80}
          />
        </div>

        <div className='lg:px-4 lg:mt-12'>
          <motion.div
            className='mb-4'
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
          >
            <Badge variant='highlight'>
              <span
                className='mr-1.5 inline-block h-2 w-2 rounded-full bg-current align-middle'
                aria-hidden='true'
              />
              {t.openToWork}
            </Badge>
          </motion.div>

          <motion.p
            className='mb-3 font-display font-bold uppercase tracking-widest text-sm text-accent'
            initial={shouldReduceMotion ? false : { x: -30 }}
            animate={{ x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
          >
            {t.greeting}
          </motion.p>

          <motion.h1
            className='text-5xl font-display font-bold text-fg lg:text-7xl'
            initial={shouldReduceMotion ? false : { x: -30 }}
            animate={{ x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          >
            {t.name}
          </motion.h1>

          <div className='mt-6 text-fg'>
            {t.summary.map((text, i) => (
              <motion.p
                key={`summary-${i}`}
                className='mb-4 text-xl'
                variants={textVariants}
                initial='hidden'
                animate='visible'
                custom={i}
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              className='mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              custom={t.summary.length}
            >
              <Button
                href={userData.resumeUrl.en}
                target='_blank'
                rel='noopener noreferrer'
                variant={language === 'en' ? 'accent' : 'neutral'}
                onClick={() => trackCvDownload('hero', 'en')}
              >
                {t.resumeEn}
              </Button>
              <Button
                href={userData.resumeUrl.ja}
                target='_blank'
                rel='noopener noreferrer'
                variant={language === 'ja' ? 'accent' : 'neutral'}
                onClick={() => trackCvDownload('hero', 'ja')}
              >
                {t.resumeJa}
              </Button>
              <Button
                href={`mailto:${userData.socialLinks.email}`}
                variant='neutral'
                onClick={() => trackContactClick('email', 'hero')}
              >
                {t.getInTouch}
              </Button>
              <Link
                href={latest ? `/blog/${latest.slug}` : '/blog'}
                onClick={() => trackBlogClick('hero', latest?.slug)}
                className='basis-full flex items-center justify-center lg:justify-start font-display font-bold text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              >
                <span className='line-clamp-2 max-w-md'>
                  {latest ? `${t.latestPost}: ${latest.title}` : t.readBlog}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <Experience />

      <Projects />

      {latest && <LatestPost post={latest} />}

      <ContactCTA />
    </div>
  )
}