'use client'

import { ThemeProvider } from 'next-themes'
import { ViewTransitions } from 'next-view-transitions'
import { LanguageProvider } from '@/context/LanguageContext'
import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { listenForClicks } from '@/constants/analytics'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(listenForClicks, [])

  return (
    <ThemeProvider
      attribute='class'
      enableSystem
      defaultTheme='system'
      disableTransitionOnChange
    >
      <LanguageProvider>
        <MotionConfig reducedMotion='user'>
          <ViewTransitions>{children}</ViewTransitions>
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  )
}