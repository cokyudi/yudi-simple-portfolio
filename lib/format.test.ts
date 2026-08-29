import { describe, expect, it } from 'vitest';
import { formatPostDate, formatReadingTime, formatTag } from '@/lib/format';

describe('formatPostDate', () => {
  it('uses the long month form for English', () => {
    expect(formatPostDate('2026-08-23', 'en')).toBe('August 23, 2026');
  });

  it('uses Japanese date order and units', () => {
    expect(formatPostDate('2026-08-23', 'ja')).toBe('2026年8月23日');
  });
});

describe('formatReadingTime', () => {
  // The spacing rule is the whole reason this helper exists: Japanese sets the
  // unit tight against the number, English needs a space.
  it('separates number and unit with a space in English', () => {
    expect(formatReadingTime(6, 'en')).toBe('6 min read');
  });

  it('sets the unit tight against the number in Japanese', () => {
    expect(formatReadingTime(6, 'ja')).toBe('6分で読む');
  });
});

describe('formatTag', () => {
  it('translates human-language tags', () => {
    expect(formatTag('job-search', 'en')).toBe('Job search');
    expect(formatTag('job-search', 'ja')).toBe('転職活動');
  });

  it('keeps technical terms canonical in both languages', () => {
    for (const lang of ['en', 'ja'] as const) {
      expect(formatTag('nextjs', lang)).toBe('Next.js');
      expect(formatTag('rag', lang)).toBe('RAG');
    }
  });

  it('falls back to the raw slug for a tag with no label yet', () => {
    // A new post can introduce a tag before it is registered in i18n; it should
    // degrade visibly rather than render blank.
    expect(formatTag('kubernetes', 'en')).toBe('kubernetes');
    expect(formatTag('kubernetes', 'ja')).toBe('kubernetes');
  });
});
