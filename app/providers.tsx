'use client'

import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'
import { MotionConfig } from 'framer-motion'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute='class'
      enableSystem
      defaultTheme='system'
      disableTransitionOnChange
    >
      <LanguageProvider>
        <MotionConfig reducedMotion='user'>
          {children}
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  )
}