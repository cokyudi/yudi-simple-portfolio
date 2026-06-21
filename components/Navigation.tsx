'use client';

import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import ThemeSwitch from '@/components/ThemeSwitch';
import { useLanguage } from '@/context/LanguageContext';

const control =
  'inline-flex items-center justify-center min-h-11 border-2 border-ink bg-surface text-fg shadow-retro-sm transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-accent active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function Navigation() {
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const isPostPage = /^\/blog\/.+/.test(pathname);

  return (
    <header className='sticky top-0 z-20 border-b-2 border-ink bg-paper'>
      <nav className='mx-auto max-w-4xl px-4 py-4 flex items-center justify-between'>
        <Link
          href='/'
          aria-label='Yudi Dharma Putra — home'
          className='font-display font-bold tracking-tight text-fg hover:text-accent transition-colors'
        >
          <span className='sm:hidden'>YUDI</span>
          <span className='hidden sm:inline'>YUDI DHARMA PUTRA</span>
        </Link>

        <div className='flex items-center gap-2 sm:gap-3'>
          <Link href='/blog' className={`${control} px-2.5 sm:px-3 text-sm font-display font-bold`}>
            Blog
          </Link>

          <Link href='/uses' className={`${control} px-2.5 sm:px-3 text-sm font-display font-bold`}>
            Uses
          </Link>

          {!isPostPage && (
            <button
              onClick={toggleLanguage}
              aria-label={language === 'en' ? 'EN, switch to Japanese' : 'JP, switch to English'}
              className={`${control} min-w-11 text-sm font-display font-bold`}
            >
              {language === 'en' ? 'EN' : 'JP'}
            </button>
          )}

          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}
