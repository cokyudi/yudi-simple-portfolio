import 'server-only';

import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';
import { SITE_URL } from '@/constants/site';
import { i18n } from '@/constants/i18n';
import { userData } from '@/constants/data';

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

// Yudi's tools/setup, formatted from the same i18n data that powers the
// /uses page — single source of truth, so the assistant never drifts from it.
function readUses(): string {
  const u = i18n.en.uses;
  const categories = u.categories as ReadonlyArray<{
    title: string;
    items: ReadonlyArray<{ name: string; note?: string }>;
  }>;
  const lines = categories.map((category) => {
    const items = category.items
      .map((item) => (item.note ? `${item.name} (${item.note})` : item.name))
      .join(', ');
    return `${category.title}: ${items}`;
  });
  return `${u.subtitle} (see ${SITE_URL}/uses)\n${lines.join('\n')}`;
}

// Projects, from the same data/i18n that powers the Projects section —
// single source of truth, so the assistant stays in sync with the site.
function readProjects(): string {
  const p = i18n.en.projects;
  const lines = userData.projects.map(
    (project) =>
      `${project.name} (${project.url}) — ${p[project.id]} Tech: ${project.tech.join(', ')}.`,
  );
  return `${p.subtitle}\n${lines.join('\n')}`;
}

// Full grounding context for the site assistant: curated profile/FAQ, the
// tools/setup, projects, plus every blog post. Cached per request lifecycle.
export const getKnowledge = cache((): string => {
  return [
    `# PROFILE & FAQ\n\n${readProfile()}`,
    `# USES / SETUP\n\n${readUses()}`,
    `# PROJECTS\n\n${readProjects()}`,
    `# BLOG POSTS\n\n${readPosts()}`,
  ].join('\n\n---\n\n');
});
