'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ja';

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Reading localStorage requires an effect: it doesn't exist during SSR, so
  // the server always renders 'en' and this corrects it after hydration. The
  // proper fix is a cookie read server-side, but that would make every page
  // vary per request and give up static prerendering for all 18 posts — not
  // worth it to remove a brief flash of English for returning JA visitors.
  useEffect(() => {
    const stored = localStorage.getItem('language') as Language;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setLanguage(stored);
  }, []);

  // Keep <html lang> in sync with the active UI language for a11y / language
  // detection. Server HTML ships as 'en'; this corrects it after hydration
  // when the user's stored/selected language is Japanese.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'ja' : 'en';
      localStorage.setItem('language', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};