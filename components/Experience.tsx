'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { userData, type ExperienceBase } from '@/constants/data';
import { i18n } from '@/constants/i18n';
import ExperienceCard from '@/components/ExperienceCard';
import { useLanguage } from '@/context/LanguageContext';

// Editorial bento spans, by position. Default cells are 1x1.
const bentoSpans = [
  'sm:col-span-2 lg:row-span-2', // 0 — featured (wide + tall on desktop)
  'sm:col-span-2',               // 1 — wide
  '',                            // 2
  '',                            // 3
  'sm:col-span-2',               // 4 — wide
  '',                            // 5
  '',                            // 6
];

export default function Experience() {
  const { language } = useLanguage();
  const t = i18n[language];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby='experience-heading'>
      <div className='max-w-5xl mx-auto mt-20 lg:mt-28 mb-8 flex justify-center md:justify-start'>
        <motion.h2
          id='experience-heading'
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
          className='text-4xl md:text-5xl font-display font-bold text-fg text-center md:text-left'
        >
          {t.heading}
        </motion.h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr [grid-auto-flow:dense] gap-4 max-w-5xl mx-auto'>
        {userData.experience.map((exp: ExperienceBase, idx) => {
          const expText = t.experience[exp.id];
          return (
            <div key={exp.id} className={bentoSpans[idx] ?? ''}>
              <ExperienceCard
                title={expText.title}
                desc={expText.desc}
                year={exp.year}
                company={exp.company}
                companyLink={exp.companyLink}
                index={idx}
                featured={idx === 0}
                tag={idx === 0 ? t.about.current : undefined}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}