import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getPostBySlug,
  getAllPostSlugs,
} from '@/lib/posts';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  try {
    const { frontMatter } = await getPostBySlug(params.slug);

    return {
      title: `${frontMatter.title} | Blog`,
      description:
        frontMatter.description ??
        `Blog post: ${frontMatter.title}`,
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug).catch(() => {
    notFound();
  });

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
        {post.frontMatter.title}
      </h1>

      <p className='text-gray-800 dark:text-gray-200 mt-2'>
        {new Date(post.frontMatter.date).toLocaleDateString(
          'en-US',
          dateOptions
        )}
      </p>

      <article className='mt-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-neutral-900 p-6 md:p-8 shadow-sm'>
        <div className='prose prose-neutral dark:prose-invert max-w-none'>
          {post.content}
        </div>
      </article>
    </div>
  );
}