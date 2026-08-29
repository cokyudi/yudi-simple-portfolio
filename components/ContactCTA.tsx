'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  trackContactClick,
  trackCvDownload,
  type ConversionLocation,
} from '@/constants/analytics';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import { userData } from '@/constants/data';

type ContactCTAProps = {
  // Blog posts have a fixed language (the toggle is hidden there), so they pass
  // the post's own lang instead of following the client-side context.
  lang?: 'en' | 'ja';
  location?: ConversionLocation;
  showResume?: boolean;
};

export default function ContactCTA({
  lang,
  location = 'footer_cta',
  showResume = false,
}: ContactCTAProps) {
  const { language } = useLanguage();
  const active = lang ?? language;
  const t = i18n[active].contact;
  const tAbout = i18n[active].about;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className='max-w-5xl mx-auto mt-16 lg:mt-24'
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
    >
      <div className='border-2 border-ink bg-surface shadow-retro p-8 md:p-12 text-center'>
        <h2 className='text-3xl md:text-4xl font-display font-bold text-fg'>
          {t.heading}
        </h2>
        <p className='mt-3 text-lg text-muted max-w-2xl mx-auto'>
          {t.subtitle}
        </p>
        <div className='mt-8 flex flex-wrap gap-4 justify-center'>
          {showResume && (
            <>
              <Button
                href={userData.resumeUrl.en}
                target='_blank'
                rel='noopener noreferrer'
                variant={active === 'en' ? 'accent' : 'neutral'}
                onClick={() => trackCvDownload(location, 'en')}
              >
                {tAbout.resumeEn}
              </Button>
              <Button
                href={userData.resumeUrl.ja}
                target='_blank'
                rel='noopener noreferrer'
                variant={active === 'ja' ? 'accent' : 'neutral'}
                onClick={() => trackCvDownload(location, 'ja')}
              >
                {tAbout.resumeJa}
              </Button>
            </>
          )}
          <Button
            href={`mailto:${userData.socialLinks.email}`}
            variant={showResume ? 'neutral' : 'accent'}
            onClick={() => trackContactClick('email', location)}
          >
            {t.email}
          </Button>
          <Button
            href={userData.socialLinks.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            variant='neutral'
            onClick={() => trackContactClick('linkedin', location)}
          >
            {t.linkedin}
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
