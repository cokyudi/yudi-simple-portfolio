import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Figure from '@/components/Figure';
import type { ReactNode } from 'react';

const postsDirectory = path.join(process.cwd(), 'posts');

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export type BlogPostFrontMatter = {
  title: string;
  date: string;
  description?: string;
};

export type BlogPost = {
  slug: string;
  content: ReactNode;
  frontMatter: BlogPostFrontMatter;
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

  if (!fs.existsSync(fullPath)) {
    throw new Error('Post not found');
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
});

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost> => {
    const { content, data } = readPostFile(slug);

    const { content: compiledContent } = await compileMDX({
      source: content,
      components: {
        Figure,
      },
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
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
      },
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