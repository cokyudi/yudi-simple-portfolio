import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getPostBySlug,
  getAllPostSlugs,
} from '@/lib/posts';
import Badge from '@/components/ui/Badge';
import { OG_VERSION } from '@/constants/og';
import { SITE_URL, SITE_NAME } from '@/constants/site';
import { i18n } from '@/constants/i18n';

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
      alternates: {
        canonical: `/blog/${slug}`,
      },
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
          )}&date=${encodeURIComponent(frontMatter.date)}&v=${OG_VERSION}`,
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
          )}&date=${encodeURIComponent(frontMatter.date)}&v=${OG_VERSION}`,
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
  const lang = post.frontMatter.lang ?? 'en';
  const locale = lang === 'ja' ? 'ja-JP' : 'en-US';
  const t = i18n[lang].blog;
  const readLabel =
    lang === 'ja'
      ? `${post.readingTime}${t.minRead}`
      : `${post.readingTime} ${t.minRead}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontMatter.title,
    description: post.frontMatter.description ?? '',
    datePublished: post.frontMatter.date,
    inLanguage: post.frontMatter.lang ?? 'en',
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    image: `${SITE_URL}/og/blog-post?title=${encodeURIComponent(
      post.frontMatter.title,
    )}&date=${encodeURIComponent(post.frontMatter.date)}&v=${OG_VERSION}`,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
  };

  return (
    <div className='max-w-4xl mx-auto px-5 py-10'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <h1
        className='text-3xl md:text-4xl font-display font-bold text-fg'
        style={{ viewTransitionName: `post-title-${slug}` }}
      >
        {post.frontMatter.title}
      </h1>

      <p className='mt-3 flex flex-wrap items-center gap-3'>
        <Badge
          variant='highlight'
          style={{ viewTransitionName: `post-date-${slug}` }}
        >
          {new Date(post.frontMatter.date).toLocaleDateString(locale, dateOptions)}
        </Badge>
        <span className='text-sm text-muted'>{readLabel}</span>
      </p>

      {post.toc.length > 0 && (
        <nav
          aria-label={t.contents}
          className='mt-8 border-2 border-ink bg-surface p-4 shadow-retro'
        >
          <p className='font-display font-bold text-fg'>{t.contents}</p>
          <ul className='mt-2 space-y-1 text-sm'>
            {post.toc.map((h) => (
              <li key={h.slug} className={h.depth === 3 ? 'ml-4' : ''}>
                <a href={`#${h.slug}`} className='text-accent hover:underline'>
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

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