import '../styles/globals.css'
import { GeistSans } from 'geist/font/sans';
import { Noto_Sans_JP } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from '@/app/providers';
import type { Metadata } from 'next';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const OG_IMAGE_VERSION = '2026-04-05-draw';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yudidputra.com'),
  title: {
    default: 'Yudi Dharma Putra',
    template: '%s | Yudi Dharma Putra',
  },
  description:
    'Full-stack engineer in Japan specializing in Next.js, React, and modern web development.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: 'Yudi Dharma Putra',
    title: 'Yudi Dharma Putra',
    description:
      'Full-stack engineer in Japan specializing in Next.js, React, and modern web development.',
    images: [`/og/home?v=${OG_IMAGE_VERSION}`],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/og/home?v=${OG_IMAGE_VERSION}`],
  },
}

function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang='en' suppressHydrationWarning className={`h-full ${GeistSans.variable} ${notoSansJP.variable}`}>
      <body suppressHydrationWarning className='min-h-screen flex flex-col font-sans'>
        <Providers>
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded focus:shadow-lg dark:focus:bg-neutral-900 dark:focus:text-white'
          >
            Skip to main content
          </a>
          <Navigation />
          <main id='main-content' className='flex-1'>
            {children}
          </main>
          <Footer />
        </Providers>

        {process.env.GTM_ID && <GoogleTagManager gtmId={process.env.GTM_ID} />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout;
