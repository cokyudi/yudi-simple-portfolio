'use client'

import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider 
      attribute='class' 
      enableSystem={false}
      defaultTheme='system'
      disableTransitionOnChange
    >
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}