import type { MetadataRoute } from 'next';
import { getAllPosts, getPostAlternates } from '@/lib/posts';
import { SITE_URL } from '@/constants/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Posts arrive newest-first. The home and blog pages both surface the latest
  // post, so their content genuinely changes when one is published — unlike
  // `new Date()`, which claimed a change on every build and spent crawl budget
  // re-fetching pages that had not moved.
  const lastPublished = new Date(posts[0].updated ?? posts[0].date);

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const pair = getPostAlternates(post.slug);

    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: 'yearly',
      priority: 0.6,
      // Declaring the EN/JA pair here tells Google the two are translations of
      // each other rather than near-duplicate pages competing for the same
      // query. Every URL in a set must list the whole set, itself included.
      ...(pair && {
        alternates: {
          languages: {
            en: `${SITE_URL}/blog/${pair.en}`,
            ja: `${SITE_URL}/blog/${pair.ja}`,
            'x-default': `${SITE_URL}/blog/${pair.en}`,
          },
        },
      }),
    };
  });

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: lastPublished,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: lastPublished,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      // No lastModified: this page changes when it is edited, and there is no
      // signal here for that. Omitting beats asserting a date that is wrong.
      url: `${SITE_URL}/uses`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...postRoutes,
  ];
}
