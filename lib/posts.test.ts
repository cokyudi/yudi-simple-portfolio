import { describe, expect, it } from 'vitest';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';

// These run against the real posts/ directory, so they assert invariants that
// must hold for any content rather than pinning specific slugs.

describe('getAllPosts', () => {
  const posts = getAllPosts();

  it('reads every post', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it('sorts newest first', () => {
    const dates = posts.map((post) => new Date(post.date).getTime());
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  it('defaults language to English when frontmatter omits it', () => {
    expect(posts.every((post) => post.lang === 'en' || post.lang === 'ja')).toBe(true);
  });

  it('gives every post a positive reading time', () => {
    expect(posts.every((post) => post.readingTime > 0)).toBe(true);
  });

  it('measures CJK posts by characters, not whitespace-delimited words', () => {
    // A Japanese post has almost no spaces, so a word-count estimate would
    // collapse it to ~1 minute. Its reading time should track its EN pair.
    const ja = posts.find((post) => post.slug.endsWith('-ja'));
    expect(ja).toBeDefined();
    const en = posts.find((post) => post.slug === ja!.slug.replace(/-ja$/, ''));
    expect(en).toBeDefined();
    expect(Math.abs(ja!.readingTime - en!.readingTime)).toBeLessThanOrEqual(3);
  });
});

describe('getPostBySlug', () => {
  it('rejects slugs that escape the posts directory', async () => {
    await expect(getPostBySlug('../../package.json')).rejects.toThrow();
  });

  it('rejects a slug that does not exist', async () => {
    await expect(getPostBySlug('no-such-post')).rejects.toThrow('Post not found');
  });
});

describe('getRelatedPosts', () => {
  const [newest] = getAllPosts();

  it('never suggests the post being read', () => {
    const related = getRelatedPosts(newest.slug, newest.lang);
    expect(related.every((post) => post.slug !== newest.slug)).toBe(true);
  });

  it('only suggests posts in the same language', () => {
    for (const lang of ['en', 'ja'] as const) {
      const post = getAllPosts().find((p) => p.lang === lang)!;
      const related = getRelatedPosts(post.slug, lang);
      expect(related.every((r) => r.lang === lang)).toBe(true);
    }
  });

  it('respects the limit', () => {
    expect(getRelatedPosts(newest.slug, newest.lang, 2)).toHaveLength(2);
  });

  it('ranks posts sharing more tags first', () => {
    const related = getRelatedPosts(newest.slug, newest.lang);
    const tags = new Set(newest.tags);
    const overlaps = related.map((post) => post.tags.filter((tag) => tags.has(tag)).length);
    expect(overlaps).toEqual([...overlaps].sort((a, b) => b - a));
  });
});
