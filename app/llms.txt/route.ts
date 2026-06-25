import { getAllPosts } from '@/lib/posts';
import { SITE_URL, SITE_NAME, SITE_TITLE } from '@/constants/site';

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPosts();

  const list = (lang: 'en' | 'ja') =>
    posts
      .filter((post) => post.lang === lang)
      .map(
        (post) =>
          `- [${post.title}](${SITE_URL}/blog/${post.slug})${
            post.description ? `: ${post.description}` : ''
          }`
      )
      .join('\n');

  const body = `# ${SITE_NAME}

> ${SITE_TITLE} in Japan specializing in Next.js, React, and modern web development.

## Pages

- [Home](${SITE_URL}/): About, experience timeline, and CV link.
- [Blog](${SITE_URL}/blog): Notes on learning, experiments, and experiences.
- [Uses](${SITE_URL}/uses): Tools, stack, and hardware Yudi uses.
- [Full site text](${SITE_URL}/llms-full.txt): Profile, FAQ, setup, and full blog posts in one file.

## Blog posts (English)

${list('en')}

## Blog posts (Japanese)

${list('ja')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
