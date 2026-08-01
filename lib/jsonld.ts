import { SITE_URL, SITE_NAME, SITE_TITLE } from '@/constants/site';
import { userData } from '@/constants/data';
import { i18n } from '@/constants/i18n';

// Stable @id so the Person entity is merged across home + every post.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}/blog#blog`;

// Employment history as dated OrganizationRole nodes (excluding the graduation
// milestone) so search engines and LLMs read exact start/end ranges instead of
// inferring them from the visible timeline.
const employmentHistory = userData.experience
  .filter((exp) => exp.id !== 'graduation')
  .map((exp) => {
    const org: Record<string, string> = {
      '@type': 'Organization',
      name: exp.company,
    };
    if (exp.companyLink) org.url = exp.companyLink;
    const role: Record<string, unknown> = {
      '@type': 'OrganizationRole',
      roleName: i18n.en.experience[exp.id].title,
      startDate: exp.year,
      worksFor: org,
    };
    if (exp.endYear) role.endDate = exp.endYear;
    return role;
  });

const graduation = userData.experience.find((exp) => exp.id === 'graduation');

export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: SITE_TITLE,
  description:
    'Full-stack engineer with 7+ years building production web applications, based in Tokyo, Japan. Works in English and Japanese (JLPT N2). Open to new full-stack engineering opportunities.',
  image: `${SITE_URL}/yudi-draw.jpg`,
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Laravel',
    'Full-stack development',
    'Frontend architecture',
    'Web performance',
  ],
  worksFor: employmentHistory,
  ...(graduation
    ? {
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: graduation.company,
          url: graduation.companyLink,
        },
      }
    : {}),
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
