'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { sendGTMEvent } from '@next/third-parties/google';
import profile from '@/public/yudi-draw.jpg';
import { Link } from 'next-view-transitions';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import ContactCTA from '@/components/ContactCTA';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import { userData } from '@/constants/data';

export default function About() {
  const { language } = useLanguage();
  const t = i18n[language].about;
  const shouldReduceMotion = useReducedMotion();

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
                href={userData.resumeUrl}
                target='_blank'
                rel='noopener noreferrer'
                variant='accent'
                onClick={() => sendGTMEvent({ event: 'cv_download', location: 'hero' })}
              >
                {t.downloadCV}
              </Button>
              <Button
                href={`mailto:${userData.socialLinks.email}`}
                variant='neutral'
                onClick={() => sendGTMEvent({ event: 'contact_click', method: 'email', location: 'hero' })}
              >
                {t.getInTouch}
              </Button>
              <Link
                href='/blog'
                className='inline-flex items-center font-display font-bold text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              >
                {t.readBlog}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <Experience />

      <Projects />

      <ContactCTA />
    </div>
  )
}