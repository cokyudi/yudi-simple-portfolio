'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { userData, type ExperienceBase } from '@/constants/data';
import { i18n } from '@/constants/i18n';
import ExperienceCard from '@/components/ExperienceCard';
import { useLanguage } from '@/context/LanguageContext';

// Editorial bento spans, by position. Default cells are 1x1. Rows share one
// height (auto-rows-fr), so the longest descriptions get the wide cells; a long
// one in a narrow cell stretches its whole row.
const bentoSpans = [
  'sm:col-span-2', // 0 — featured
  'sm:col-span-2', // 1
  'sm:col-span-2', // 2
  '',              // 3
  '',              // 4
  'sm:col-span-2', // 5
  '',              // 6
  '',              // 7
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
          className='text-3xl md:text-4xl font-display font-bold text-fg text-center md:text-left'
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
                endYear={exp.endYear}
                present={t.about.present}
                company={exp.company}
                companyLink={exp.companyLink}
                index={idx}
                featured={idx === 0}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}