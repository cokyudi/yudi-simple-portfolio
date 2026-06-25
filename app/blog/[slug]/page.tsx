import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getPostBySlug,
  getAllPostSlugs,
  getAllPosts,
} from '@/lib/posts';
import Badge from '@/components/ui/Badge';
import BlogCard from '@/components/BlogCard';
import { OG_VERSION } from '@/constants/og';
import { SITE_URL } from '@/constants/site';
import { i18n } from '@/constants/i18n';
import {
  personSchema,
  breadcrumbSchema,
  jsonLdGraph,
  PERSON_ID,
  BLOG_ID,
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

    // EN/JA posts pair as `slug.mdx` ↔ `slug-ja.mdx`. If both exist, emit
    // hreflang alternates so Google links the language versions.
    const allSlugs = new Set(getAllPostSlugs().map((s) => s.slug));
    const enSlug = slug.endsWith('-ja') ? slug.slice(0, -3) : slug;
    const jaSlug = `${enSlug}-ja`;
    const hasPair = allSlugs.has(enSlug) && allSlugs.has(jaSlug);
    const languages = hasPair
      ? {
          en: `/blog/${enSlug}`,
          ja: `/blog/${jaSlug}`,
          'x-default': `/blog/${enSlug}`,
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
        publishedTime: frontMatter.date,
        authors: ['Yudi Dharma Putra'],
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

  const blogPosting = {
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${slug}#post`,
    headline: post.frontMatter.title,
    description: post.frontMatter.description ?? '',
    datePublished: post.frontMatter.date,
    dateModified: post.frontMatter.date,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: lang,
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    image: `${SITE_URL}/og/blog-post?title=${encodeURIComponent(
      post.frontMatter.title,
    )}&date=${encodeURIComponent(post.frontMatter.date)}&v=${OG_VERSION}`,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': BLOG_ID },
  };

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.frontMatter.title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  // Internal linking: same-language posts, newest first, excluding this one.
  const relatedPosts = getAllPosts()
    .filter((p) => p.lang === lang && p.slug !== slug)
    .slice(0, 3);

  return (
    <div className='max-w-4xl mx-auto px-5 py-10'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(breadcrumb, blogPosting, personSchema),
        }}
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
        <Badge variant='neutral'>{readLabel}</Badge>
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
    </div>
  );
}