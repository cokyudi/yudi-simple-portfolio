'use client';

import { motion } from 'framer-motion';

export type ExperienceCardProps = {
  title: string;
  desc: string;
  year: string;
  company: string;
  companyLink: string;
  index: number;
};

export default function ExperienceCard({
  title,
  desc,
  year,
  company,
  companyLink,
  index,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -4 }}
      className='relative border p-6 rounded-xl shadow-md bg-white dark:bg-neutral-800 z-10 mx-4 transition-all'
    >
      <div className='absolute -top-10 -left-1 text-4xl text-neutral-400 font-bold dark:text-neutral-600 select-none'>
        {year}
      </div>

      <h3 className='font-semibold text-xl'>{title}</h3>

      <a
        href={companyLink}
        target='_blank'
        rel='noopener noreferrer'
        className='text-teal-500 hover:underline'
      >
        {company}
      </a>

      <p className='text-neutral-600 dark:text-neutral-400 my-2'>
        {desc}
      </p>
    </motion.div>
  );
}