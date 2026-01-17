import 'tailwindcss/tailwind.css'
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import Providers from '@/app/providers';
import type { Metadata } from 'next';
import 'flag-icons';

export const metadata: Metadata = {
  title: {
    default: 'Yudi Dharma Putra',
    template: '%s | Yudi Dharma Putra',
  },
  description:
    'Full-stack engineer in Japan specializing in Next.js, React, and modern web development.',
  icons: {
    icon: '/logo.png',
  },
}

function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang='en' suppressHydrationWarning className='h-full'>
      <body className='min-h-screen flex flex-col'>
        <Providers>
          <Navigation />
          <main className='flex-1'>
            {children}
          </main>
          <Footer />
        </Providers>

        <GoogleTagManager gtmId='GTM-WVZ645LG' />
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout;
