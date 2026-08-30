import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getPostBySlug,
  getAllPostSlugs,
  getPostAlternates,
  getRelatedPosts,
} from '@/lib/posts';
import Badge from '@/components/ui/Badge';
import BlogCard from '@/components/BlogCard';
import ContactCTA from '@/components/ContactCTA';
import { OG_VERSION } from '@/constants/og';
import { SITE_URL } from '@/constants/site';
import { i18n } from '@/constants/i18n';
import { formatPostDate, formatReadingTime } from '@/lib/format';
import {
  personSchema,
  breadcrumbSchema,
  blogPostingSchema,
  jsonLdGraph,
  isoDateTime,
} from '@/lib/jsonld';

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

    const pair = getPostAlternates(slug);
    const languages = pair
      ? {
          en: `/blog/${pair.en}`,
          ja: `/blog/${pair.ja}`,
          'x-default': `/blog/${pair.en}`,
        }
      : undefined;

    return {
      title: `${frontMatter.title} | Blog`,
      description:
        frontMatter.description ??
        `Blog post: ${frontMatter.title}`,
      alternates: {
        canonical: `/blog/${slug}`,
        ...(languages ? { languages } : {}),
      },
      openGraph: {
        type: 'article',
        publishedTime: isoDateTime(frontMatter.date),
        authors: ['Yudi Dharma Putra'],
        title: `${frontMatter.title} | Blog`,
        description:
          frontMatter.description ??
          `Blog post: ${frontMatter.title}`,
        url: `/blog/${slug}`,
        images: [
          {
            url: `/og/blog-post?title=${encodeURIComponent(
              frontMatter.title
            )}&date=${encodeURIComponent(frontMatter.date)}&v=${OG_VERSION}`,
            alt: frontMatter.title,
          },
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

  const lang = post.frontMatter.lang ?? 'en';
  const t = i18n[lang].blog;

  const blogPosting = blogPostingSchema({
    slug,
    title: post.frontMatter.title,
    description: post.frontMatter.description,
    date: post.frontMatter.date,
    updated: post.frontMatter.updated,
    lang,
    tags: post.frontMatter.tags,
    readingTime: post.readingTime,
    image: `${SITE_URL}/og/blog-post?title=${encodeURIComponent(
      post.frontMatter.title,
    )}&date=${encodeURIComponent(post.frontMatter.date)}&v=${OG_VERSION}`,
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.frontMatter.title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  const relatedPosts = getRelatedPosts(slug, lang);

  return (
    <div className='max-w-4xl mx-auto px-5 py-10'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(breadcrumb, blogPosting, personSchema),
        }}
      />
      <h1
        className='text-4xl md:text-5xl font-display font-bold text-fg'
        style={{ viewTransitionName: `post-title-${slug}` }}
      >
        {post.frontMatter.title}
      </h1>

      <p className='mt-3 flex flex-wrap items-center gap-3'>
        <Badge
          variant='highlight'
          style={{ viewTransitionName: `post-date-${slug}` }}
        >
          <time dateTime={post.frontMatter.date}>
            {formatPostDate(post.frontMatter.date, lang)}
          </time>
        </Badge>
        <Badge variant='neutral'>{formatReadingTime(post.readingTime, lang)}</Badge>
      </p>

      {post.toc.length > 0 && (
        <nav
          aria-label={t.contents}
          className='mt-8 border-2 border-ink bg-surface/50 p-4'
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
          prose prose-lg max-w-none
          prose-headings:font-display
          prose-img:border-2 prose-img:border-ink prose-img:shadow-retro prose-img:rounded-none
          prose-pre:border-2 prose-pre:border-ink prose-pre:rounded-none
          prose-code:before:content-none
          prose-code:after:content-none
        '>
          {post.content}
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className='mt-14'>
          <h2 className='text-2xl font-display font-bold text-fg'>{t.readNext}</h2>
          <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {relatedPosts.map((p) => (
              <BlogCard key={p.slug} {...p} lang={lang} />
            ))}
          </div>
        </section>
      )}

      <ContactCTA lang={lang} location='blog_post' showResume />
    </div>
  );
}