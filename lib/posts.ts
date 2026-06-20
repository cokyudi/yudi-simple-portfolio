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
};

export type BlogPostFrontMatter = {
  title: string;
  date: string;
  description?: string;
  lang?: 'en' | 'ja';
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
      const { data } = readPostFile(slug);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: (data.description as string) ?? '',
        lang: (data.lang as 'en' | 'ja') ?? 'en',
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
});

export const getAllPostSlugs = cache(() => {
  return getPostFileNames().map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
});