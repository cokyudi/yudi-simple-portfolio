'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { sendGTMEvent } from '@next/third-parties/google';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import { userData } from '@/constants/data';

export default function ContactCTA() {
  const { language } = useLanguage();
  const t = i18n[language].contact;
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
          <Button
            href={`mailto:${userData.socialLinks.email}`}
            variant='accent'
            onClick={() => sendGTMEvent({ event: 'contact_click', method: 'email', location: 'footer_cta' })}
          >
            {t.email}
          </Button>
          <Button
            href={userData.socialLinks.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            variant='neutral'
            onClick={() => sendGTMEvent({ event: 'contact_click', method: 'linkedin', location: 'footer_cta' })}
          >
            {t.linkedin}
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
