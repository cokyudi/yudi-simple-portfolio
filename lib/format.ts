import { i18n, type Language } from '@/constants/i18n';

const LOCALES: Record<Language, string> = { en: 'en-US', ja: 'ja-JP' };

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

// Intl.DateTimeFormat construction is the expensive part, so keep one per
// language rather than building a new formatter for every card.
const dateFormatters = new Map<Language, Intl.DateTimeFormat>();

/** Post date as displayed on cards and post pages, e.g. "23 August 2026". */
export function formatPostDate(date: string, lang: Language): string {
  let formatter = dateFormatters.get(lang);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(LOCALES[lang], DATE_OPTIONS);
    dateFormatters.set(lang, formatter);
  }
  return formatter.format(new Date(date));
}

/**
 * Reading time with its unit. Japanese sets the unit tight against the number
 * ("6分で読む"); English needs a space ("6 min read").
 */
export function formatReadingTime(minutes: number, lang: Language): string {
  const unit = i18n[lang].blog.minRead;
  return lang === 'ja' ? `${minutes}${unit}` : `${minutes} ${unit}`;
}

/**
 * Display label for a tag slug. Slugs in post frontmatter are language-neutral;
 * an unmapped tag falls back to its raw slug so a newly invented tag degrades
 * visibly (as `job-search`) rather than rendering blank. The cast is confined
 * here so callers never index the map directly.
 */
export function formatTag(slug: string, lang: Language): string {
  const labels: Record<string, string> = i18n[lang].tags;
  return labels[slug] ?? slug;
}
