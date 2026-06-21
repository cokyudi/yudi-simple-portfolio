'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';

export default function Uses() {
  const { language } = useLanguage();
  const t = i18n[language].uses;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className='max-w-4xl mx-auto px-5 py-10'>
      <h1 className='text-4xl md:text-5xl font-display font-bold text-fg'>
        {t.heading}
      </h1>
      <p className='mt-3 text-lg text-muted'>{t.subtitle}</p>

      <div className='mt-10 grid gap-6 sm:grid-cols-2'>
        {t.categories.map((category, i) => (
          <motion.section
            key={category.title}
            className='border-2 border-ink bg-surface p-6 shadow-retro'
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: i * 0.08, ease: 'easeOut' }
            }
          >
            <h2 className='font-display font-bold uppercase tracking-widest text-sm text-accent'>
              {category.title}
            </h2>
            <ul className='mt-4 space-y-3'>
              {category.items.map((item) => (
                <li key={item.name}>
                  <span className='font-display font-bold text-fg'>{item.name}</span>
                  {item.note && (
                    <span className='text-sm text-muted'> — {item.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
