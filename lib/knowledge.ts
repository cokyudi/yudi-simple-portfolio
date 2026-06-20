import 'server-only';

import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';
import { SITE_URL } from '@/constants/site';

const knowledgeDir = path.join(process.cwd(), 'knowledge');
const postsDir = path.join(process.cwd(), 'posts');

// Curated profile + FAQ files (manually maintained).
function readProfile(): string {
  return fs
    .readdirSync(knowledgeDir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => fs.readFileSync(path.join(knowledgeDir, file), 'utf8'))
    .join('\n\n---\n\n');
}

// Blog posts, globbed from posts/ — new posts are included automatically,
// no separate registration step.
function readPosts(): string {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.mdx'))
    .sort()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const { data, content } = matter(
        fs.readFileSync(path.join(postsDir, file), 'utf8'),
      );
      const title = (data.title as string) ?? slug;
      const lang = (data.lang as string) ?? 'en';
      const summary = (data.description as string) ?? '';
      return [
        `BLOG POST (${lang}): ${title}`,
        `URL: ${SITE_URL}/blog/${slug}`,
        summary ? `Summary: ${summary}` : '',
        '',
        content.trim(),
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n---\n\n');
}

// Full grounding context for the site assistant: curated profile/FAQ plus
// every blog post. Cached per request lifecycle.
export const getKnowledge = cache((): string => {
  return `# PROFILE & FAQ\n\n${readProfile()}\n\n---\n\n# BLOG POSTS\n\n${readPosts()}`;
});
