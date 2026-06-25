import { SITE_URL, SITE_NAME, SITE_TITLE } from '@/constants/site';
import { userData } from '@/constants/data';

// Stable @id so the Person entity is merged across home + every post.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}/blog#blog`;

export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: SITE_TITLE,
  sameAs: [userData.socialLinks.linkedin, userData.socialLinks.github],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

// Frontmatter dates are 'YYYY-MM-DD'. Schema.org / Google prefer a full
// ISO 8601 datetime with a timezone, so anchor to JST (author is in Japan).
export function isoDateTime(date: string): string {
  return `${date}T00:00:00+09:00`;
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Serializes one or more schema nodes into a single @graph document.
export function jsonLdGraph(...nodes: object[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
