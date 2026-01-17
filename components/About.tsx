'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import profile from '@/public/profile.jpg';
import Experience from '@/components/Experience';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import { userData } from '@/constants/data';

export default function About() {
  const { language } = useLanguage();
  const t = i18n[language].about;

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <div className='container px-4'>
      <div className='lg:space-x-5 lg:flex lg:flex-row items-center lg:-mx-4 flex flex-col text-center lg:text-left'>
        <motion.div
          className='flex-shrink-0 lg:mt-12 lg:px-4 mb-10 ml-auto mr-auto'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src={profile}
            alt='profile photo of Yudi Dharma Putra'
            priority
            className='rounded-full shadow-lg'
            width={250}
            height={250}
            placeholder='blur'
            sizes="250px"
            quality={80}
          />
        </motion.div>

        <div className='lg:px-4 lg:mt-12'>
          <motion.h1
            className='text-5xl font-bold text-gray-900 lg:text-7xl dark:text-white'
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {t.greeting}
          </motion.h1>

          <div className='mt-6 text-gray-800 dark:text-white'>
            {t.summary.map((text, i) => (
              <motion.p
                key={`summary-${i}`}
                className='mb-4 text-xl'
                variants={textVariants}
                initial='hidden'
                whileInView='visible'
                custom={i}
              >
                {text}
              </motion.p>
            ))}

            <motion.a
              href={userData.resumeUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600 inline-block'
              variants={textVariants}
              initial='hidden'
              whileInView='visible'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.downloadCV}
            </motion.a>

            <motion.div
              className='my-5'
              variants={textVariants}
              initial='hidden'
              whileInView='visible'
            >
              <Link href='/blog' passHref>
                <motion.span
                  className='inline-block text-sm font-medium text-teal-500 dark:text-teal-300'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.readBlog}
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Experience />
      </motion.div>
    </div>
  )
}