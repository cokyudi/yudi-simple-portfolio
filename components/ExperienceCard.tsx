'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export type ExperienceCardProps = {
  title: string;
  desc: string;
  year: string;
  endYear?: string;
  present?: string;
  company: string;
  companyLink: string;
  index: number;
  featured?: boolean;
  tag?: string;
};

export default function ExperienceCard({
  title,
  desc,
  year,
  endYear,
  present,
  company,
  companyLink,
  index,
  featured = false,
  tag,
}: ExperienceCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Explicit range when we have an end date; ongoing role shows "– Present";
  // point-in-time milestones (no end, not the current role) show the year alone.
  const period = endYear
    ? `${year} – ${endYear}`
    : featured
      ? `${year} – ${present ?? 'Present'}`
      : year;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      className='relative z-10 h-full'
    >
      <Card className='relative h-full flex flex-col p-6'>
        <div className='absolute -top-3 left-4'>
          <Badge variant='neutral'>{period}</Badge>
        </div>

        {tag && (
          <div className='absolute -top-3 right-4'>
            <Badge variant='highlight'>{tag}</Badge>
          </div>
        )}

        <h3 className={`mt-2 font-display font-bold text-fg ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {title}
        </h3>

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

        <p className={`text-muted my-2 ${featured ? 'text-lg' : ''}`}>{desc}</p>
      </Card>
    </motion.div>
  );
}
