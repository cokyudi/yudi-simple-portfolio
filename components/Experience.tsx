'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { userData, type ExperienceBase } from '@/constants/data';
import { i18n } from '@/constants/i18n';
import ExperienceCard from '@/components/ExperienceCard';
import TimelineDivider from '@/components/TimelineDivider';
import { useLanguage } from '@/context/LanguageContext';

export default function Experience() {
  const { language } = useLanguage();
  const t = i18n[language];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby='experience-heading'>
      <div className='max-w-6xl mx-auto h-48 bg-white dark:bg-neutral-800 flex items-center justify-center md:justify-start'>
        <motion.h2
          id='experience-heading'
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='text-5xl md:text-7xl font-bold text-center md:text-left'
        >
          {t.heading}
        </motion.h2>
      </div>

      <div className='bg-gray-100 dark:bg-neutral-900 -mt-4'>
        <div className='grid grid-cols-1 max-w-4xl mx-auto pt-20'>
          {userData.experience.map((exp: ExperienceBase, idx) => {
            const expText = t.experience[exp.id];
            return (
              <div key={exp.id}>
                <ExperienceCard
                  title={expText.title}
                  desc={expText.desc}
                  year={exp.year}
                  company={exp.company}
                  companyLink={exp.companyLink}
                  index={idx}
                />

                {idx !== userData.experience.length - 1 && (
                  <TimelineDivider />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}