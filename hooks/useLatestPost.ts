'use client';

import { useLanguage } from '@/context/LanguageContext';
import type { BlogPostMeta } from '@/lib/posts';

/**
 * Newest post in the language the visitor is currently reading. The list
 * arrives sorted newest-first, so the first match wins. Returns undefined when
 * a language has no posts yet, which callers treat as "hide the blog entry
 * point" rather than an error.
 *
 * Lives in a hook because the pick depends on LanguageContext, which only
 * exists on the client — a Server Component can't make it.
 */
export function useLatestPost(posts: BlogPostMeta[]): BlogPostMeta | undefined {
  const { language } = useLanguage();
  return posts.find((post) => post.lang === language);
}
