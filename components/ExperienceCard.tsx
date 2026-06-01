'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.15 }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      className='relative z-10 mx-4'
    >
      <Card className='relative p-6'>
        <div className='absolute -top-3 left-4'>
          <Badge variant='neutral'>{year}</Badge>
        </div>

        <h3 className='mt-2 font-display font-bold text-xl text-fg'>{title}</h3>

        {companyLink ? (
          <a
            href={companyLink}
            target='_blank'
            rel='noopener noreferrer'
            className='text-accent font-medium hover:underline'
          >
            {company}
          </a>
        ) : (
          <span className='text-fg'>{company}</span>
        )}

        <p className='text-muted my-2'>{desc}</p>
      </Card>
    </motion.div>
  );
}
