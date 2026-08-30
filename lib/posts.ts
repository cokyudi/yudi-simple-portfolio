import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import Figure from '@/components/Figure';
import type { ReactNode } from 'react';

const postsDirectory = path.join(process.cwd(), 'posts');

export type TocItem = { depth: number; text: string; slug: string };

// Estimate reading time: ~200 wpm for EN, ~500 chars/min for JA (CJK).
function computeReadingTime(content: string, lang: 'en' | 'ja'): number {
  if (lang === 'ja') {
    const chars = (content.match(/[　-鿿＀-￯]/g) ?? []).length || content.length;
    return Math.max(1, Math.round(chars / 500));
  }
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Extract h2/h3 headings from raw markdown, slugged with the same algorithm
// rehype-slug uses (github-slugger), so anchors match the rendered heading ids.
function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];
  let inCode = false;
  for (const line of content.split('\n')) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      const text = match[2].replace(/[*_`]/g, '').trim();
      toc.push({ depth: match[1].length, text, slug: slugger.slug(text) });
    }
  }
  return toc;
}

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  lang: 'en' | 'ja';
  tags: string[];
  readingTime: number;
  updated?: string;
};

export type BlogPostFrontMatter = {
  title: string;
  date: string;
  description?: string;
  lang?: 'en' | 'ja';
  updated?: string;
  tags?: string[];
};

export type BlogPost = {
  slug: string;
  content: ReactNode;
  frontMatter: BlogPostFrontMatter;
  readingTime: number;
  toc: TocItem[];
};

function getPostFileNames(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'));
}

function getPostFilePath(slug: string): string {
  return path.join(postsDirectory, `${slug}.mdx`);
}

const readPostFile = cache((slug: string) => {
  const fullPath = getPostFilePath(slug);

  // Guard against path traversal: resolved path must stay within postsDirectory
  if (!fullPath.startsWith(postsDirectory + path.sep) && fullPath !== postsDirectory) {
    throw new Error('Invalid slug');
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error('Post not found');
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
});

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost> => {
    const { content, data } = readPostFile(slug);
    const lang = (data.lang as 'en' | 'ja') ?? 'en';

    const { content: compiledContent } = await compileMDX({
      source: content,
      components: {
        Figure,
      },
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      },
    });

    return {
      slug,
      content: compiledContent,
      frontMatter: {
        title: data.title as string,
        date: data.date as string,
        description: data.description as string | undefined,
        lang,
        updated: data.updated as string | undefined,
        tags: (data.tags as string[] | undefined) ?? [],
      },
      readingTime: computeReadingTime(content, lang),
      toc: extractToc(content),
    };
  }
);

export const getAllPosts = cache((): BlogPostMeta[] => {
  return getPostFileNames()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      // gray-matter already returns the body, so reading time costs nothing
      // extra here — no MDX compilation needed for the list view.
      const { data, content } = readPostFile(slug);
      const lang = (data.lang as 'en' | 'ja') ?? 'en';

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: (data.description as string) ?? '',
        lang,
        tags: (data.tags as string[] | undefined) ?? [],
        readingTime: computeReadingTime(content, lang),
        updated: data.updated as string | undefined,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
});

/**
 * Same-language posts ranked by shared-tag overlap, then newest first. Falls
 * back to purely chronological when a post carries no tags.
 */
export const getRelatedPosts = cache(
  (slug: string, lang: 'en' | 'ja', limit = 3): BlogPostMeta[] => {
    const post = getAllPosts().find((p) => p.slug === slug);
    const tags = new Set(post?.tags ?? []);

    return getAllPosts()
      .filter((p) => p.lang === lang && p.slug !== slug)
      .map((p) => ({ post: p, shared: p.tags.filter((tag) => tags.has(tag)).length }))
      .sort(
        (a, b) =>
          b.shared - a.shared ||
          new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
      )
      .slice(0, limit)
      .map((ranked) => ranked.post);
  },
);

/**
 * EN/JA posts pair by filename convention: `slug.mdx` ↔ `slug-ja.mdx`. Returns
 * both slugs when the pair exists, so post metadata and the sitemap declare
 * hreflang alternates from one place instead of each re-deriving the rule.
 */
export const getPostAlternates = cache(
  (slug: string): { en: string; ja: string } | null => {
    const slugs = new Set(getAllPostSlugs().map((entry) => entry.slug));
    const en = slug.endsWith('-ja') ? slug.slice(0, -3) : slug;
    const ja = `${en}-ja`;
    return slugs.has(en) && slugs.has(ja) ? { en, ja } : null;
  },
);

export const getAllPostSlugs = cache(() => {
  return getPostFileNames().map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
});