import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getPostBySlug,
  getAllPostSlugs,
} from '@/lib/posts';
import Badge from '@/components/ui/Badge';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { frontMatter } = await getPostBySlug(slug);

    return {
      title: `${frontMatter.title} | Blog`,
      description:
        frontMatter.description ??
        `Blog post: ${frontMatter.title}`,
      openGraph: {
        type: 'article',
        title: `${frontMatter.title} | Blog`,
        description:
          frontMatter.description ??
          `Blog post: ${frontMatter.title}`,
        url: `/blog/${slug}`,
        images: [
          `/og/blog-post?title=${encodeURIComponent(
            frontMatter.title
          )}&date=${encodeURIComponent(frontMatter.date)}`,
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${frontMatter.title} | Blog`,
        description:
          frontMatter.description ??
          `Blog post: ${frontMatter.title}`,
        images: [
          `/og/blog-post?title=${encodeURIComponent(
            frontMatter.title
          )}&date=${encodeURIComponent(frontMatter.date)}`,
        ],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => {
    notFound();
  });

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const locale = post.frontMatter.lang === 'ja' ? 'ja-JP' : 'en-US';

  return (
    <div className='max-w-4xl mx-auto px-5 py-10'>
      <h1 className='text-3xl md:text-4xl font-display font-bold text-fg'>
        {post.frontMatter.title}
      </h1>

      <p className='mt-3'>
        <Badge variant='highlight'>
          {new Date(post.frontMatter.date).toLocaleDateString(locale, dateOptions)}
        </Badge>
      </p>

      <article className='mt-10 border-2 border-ink bg-surface p-6 md:p-8 shadow-retro'>
        <div className='
          prose max-w-none
          prose-headings:font-display
          prose-img:border-2 prose-img:border-ink prose-img:shadow-retro prose-img:rounded-none
          prose-pre:border-2 prose-pre:border-ink prose-pre:rounded-none
          prose-code:before:content-none
          prose-code:after:content-none
        '>
          {post.content}
        </div>
      </article>
    </div>
  );
}