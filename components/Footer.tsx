'use client';

import { Link } from 'next-view-transitions';
import { sendGTMEvent } from '@next/third-parties/google';
import { userData } from '@/constants/data';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';

const iconClass =
  'inline-flex h-9 w-9 items-center justify-center border-2 border-ink bg-surface text-fg shadow-retro-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-accent active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent';

const Footer = () => {
  const { language } = useLanguage();
  const t = i18n[language].footer;
  const year = new Date().getFullYear();

  return (
    <footer className='mt-16 lg:mt-24 border-t-2 border-ink'>
      <div className='max-w-4xl mx-auto px-5 py-8 pb-28 flex flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left'>
        <div>
          <p className='font-display font-bold text-fg'>Yudi Dharma Putra</p>
          <p className='mt-1 text-sm text-muted'>
            © {year} · {t.builtWith}
          </p>
        </div>

        <div className='flex flex-col items-center gap-4 sm:items-end'>
          <nav className='flex gap-4 text-sm font-display font-bold text-fg'>
            <Link href='/' className='hover:text-accent transition-colors'>
              {t.home}
            </Link>
            <Link href='/blog' className='hover:text-accent transition-colors'>
              {t.blog}
            </Link>
            <Link href='/uses' className='hover:text-accent transition-colors'>
              {t.uses}
            </Link>
          </nav>

          <div className='flex gap-3'>
            <a
              aria-label={t.github}
              href={userData.socialLinks.github}
              target='_blank'
              rel='noopener noreferrer'
              className={iconClass}
              onClick={() => sendGTMEvent({ event: 'contact_click', method: 'github' })}
            >
              <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
              </svg>
            </a>
            <a
              aria-label={t.linkedin}
              href={userData.socialLinks.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className={iconClass}
              onClick={() => sendGTMEvent({ event: 'contact_click', method: 'linkedin' })}
            >
              <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' />
              </svg>
            </a>
            <a
              aria-label={t.email}
              href={`mailto:${userData.socialLinks.email}`}
              className={iconClass}
              onClick={() => sendGTMEvent({ event: 'contact_click', method: 'email' })}
            >
              <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
