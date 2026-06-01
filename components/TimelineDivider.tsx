'use client';

import { motion } from 'framer-motion';

export default function TimelineDivider() {
  return (
    <div className='divider-container flex flex-col items-center -mt-2' aria-hidden="true">
      <motion.div
        className='w-4 h-4 bg-highlight border-2 border-ink rounded-full relative z-10'
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div className='w-4 h-4 bg-highlight rounded-full absolute inset-0 animate-ping' />
      </motion.div>

      <motion.div
        className='w-0.5 h-24 bg-ink -mt-2'
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: 'top' }}
        viewport={{ once: true }}
      />
    </div>
  );
}