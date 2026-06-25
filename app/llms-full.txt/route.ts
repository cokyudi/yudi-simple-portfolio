import { getKnowledge } from '@/lib/knowledge';
import { SITE_NAME, SITE_TITLE } from '@/constants/site';

export const dynamic = 'force-static';

// Full-text variant of /llms.txt: inlines the actual content (profile, FAQ,
// setup, and full blog posts) so AI crawlers can ground on it directly.
export function GET() {
  const body = `# ${SITE_NAME}

> ${SITE_TITLE} in Japan specializing in Next.js, React, and modern web development.
> This file contains the full text of the site for AI assistants and crawlers.

${getKnowledge()}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
