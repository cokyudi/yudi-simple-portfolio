'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import { userData } from '@/constants/data';

export default function Projects() {
  const { language } = useLanguage();
  const t = i18n[language].projects;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='container px-5 mt-16 lg:mt-24'>
      <div className='max-w-5xl mx-auto'>
        <h2 className='text-3xl font-display font-bold text-fg'>{t.heading}</h2>
        <p className='mt-2 text-muted'>{t.subtitle}</p>

        <div className='mt-8 grid gap-6 sm:grid-cols-2'>
          {userData.projects.map((project, i) => (
            <motion.article
              key={project.id}
              className='flex flex-col border-2 border-ink bg-surface p-6 shadow-retro'
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: i * 0.08, ease: 'easeOut' }
              }
            >
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='font-display font-bold text-lg text-fg hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              >
                {project.name} <span aria-hidden='true'>↗</span>
              </a>

              <p className='mt-3 flex-1 text-sm text-muted'>{t[project.id]}</p>

              <ul className='mt-4 flex flex-wrap gap-2'>
                {project.tech.map((tag) => (
                  <li key={tag}>
                    <Badge variant='neutral'>{tag}</Badge>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
