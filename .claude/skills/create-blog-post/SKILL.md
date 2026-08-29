# Skill: Create Blog Post

**Trigger:** `/new-post`

## Objective

Scaffold a new bilingual blog post (English + Japanese) in the `posts/` directory following the project's established conventions — correct frontmatter, slug naming, MDX structure, and a matching `-ja` counterpart.

## Constraints

- Always create **two files**: `posts/[slug].mdx` (English) and `posts/[slug]-ja.mdx` (Japanese).
- Slugs must be **kebab-case**, descriptive, and URL-safe (e.g. `my-new-post`).
- The English file must **omit** the `lang` field (defaults to `'en'`). The Japanese file must include `lang: "ja"`.
- `date` must use `YYYY-MM-DD` format matching today's date unless the user specifies otherwise.
- Both files must include a `tags` array (3–6 lowercase, kebab-case topic tags, e.g. `["ai", "claude", "developer-experience"]`). Use the **same tags** for the EN and JA versions — tag slugs are language-neutral identifiers, so never translate them *in the frontmatter*. Tags power topic-based "Read next" related posts, the `keywords` field in structured data, and the tag row on blog cards.
- **Any new tag slug must be given a display label in `constants/i18n.ts`** — one entry under `en.tags` and one under `ja.tags`. Blog cards render `i18n[lang].tags[slug] ?? slug`, so a tag with no entry falls back to its raw slug (`job-search` instead of "Job search" / 「転職活動」). Prefer reusing an existing tag over inventing a new one; check the current list first.
- Do **not** add the optional `updated: "YYYY-MM-DD"` field on a new post — it's only for later content edits (it drives `dateModified` in JSON-LD; absent, it falls back to `date`).
- Do **not** hardcode strings in components — blog content lives only in `.mdx` files.
- Do **not** modify `lib/posts.ts`, `app/blog/`, or any component unless explicitly asked. The one exception is adding tag display labels to `constants/i18n.ts` as described above.
- The MDX body must use valid JSX syntax. Use the `<Figure>` component for images when needed (it is globally available in MDX).
- Keep the writing tone personal and conversational, consistent with existing posts.
- Each post should include a **header image** sourced via the `find-blog-image` skill (see workflow), unless the user opts out. The same image is used for both the EN and JA versions.

## Workflow

1. **Gather info:** Ask the user for (or infer from context):
   - Post title (EN + JA)
   - Short description / subtitle (EN + JA) — keep each ≤160 characters so it isn't truncated in search results
   - Slug (suggest one from the title if not provided)
   - Tags (suggest 3–6 from the title/outline if not provided)
   - Rough content outline or key points to cover
2. **Create English post** at `posts/[slug].mdx` with the frontmatter and a drafted MDX body.
3. **Create Japanese post** at `posts/[slug]-ja.mdx` with translated frontmatter (`lang: "ja"`) and a translated MDX body.
4. **Register any new tags:** For each tag in the frontmatter, check whether it already exists under `en.tags` and `ja.tags` in `constants/i18n.ts`. Add an entry in both languages for any that is missing, keeping each list alphabetical. Translate only human-language concepts (`japan` → 日本, `career` → キャリア, `job-search` → 転職活動, `personal` → 個人); keep technical terms and proper nouns in their canonical form in **both** languages (`react` → React, `nextjs` → Next.js, `ai` → AI, `rag` → RAG) — Japanese developers write these in English, so katakana would read worse.
5. **Add a header image (automatic):** Run the `find-blog-image` skill with the new slug to source a freely-licensed, optimized image into `public/images/blog/[slug].webp`, then insert the returned `<Figure>` near the top of **both** the EN and JA posts — same image, with `alt`/`caption` localized per language and `priority` set (it's the hero). If image sourcing fails, leave the posts text-only and tell the user.
6. **Verify** both files have the correct frontmatter fields (`title`, `date`, `description`, `tags`, and `lang` for JA only), the `tags` arrays match between EN and JA, **every tag resolves to a label in both `en.tags` and `ja.tags`**, the slug filenames match, and the image file exists in `public/images/blog/`.
7. **Confirm** to the user that the files are ready and remind them to run `npm run build` to validate static generation.

## Frontmatter Schema

### English (`posts/[slug].mdx`)

```mdx
---
title: "Post Title in English"
date: "YYYY-MM-DD"
description: "A one-sentence summary of the post."
tags: ["tag-one", "tag-two", "tag-three"]
---
```

### Japanese (`posts/[slug]-ja.mdx`)

```mdx
---
title: "日本語のタイトル"
date: "YYYY-MM-DD"
description: "投稿の一文要約。"
tags: ["tag-one", "tag-two", "tag-three"]
lang: "ja"
---
```

> `tags` slugs are shared verbatim across both languages — the translation lives in the `en.tags` / `ja.tags` maps in `constants/i18n.ts`, not in the frontmatter. Add `updated: "YYYY-MM-DD"` only when meaningfully revising an existing post (drives `dateModified`).

## Example Output

**Slug:** `lessons-from-code-review`

`posts/lessons-from-code-review.mdx`

```mdx
---
title: "What Code Reviews Taught Me About Communication"
date: "2026-05-04"
description: "Code review is not just about catching bugs — it is a masterclass in written communication."
tags: ["code-review", "communication", "engineering-culture"]
---

## The Comment That Changed How I Write Code

I still remember the first pull request review that made me genuinely reconsider how I write code...
```

`posts/lessons-from-code-review-ja.mdx`

```mdx
---
title: "コードレビューがコミュニケーションについて教えてくれたこと"
date: "2026-05-04"
description: "コードレビューはバグを見つけるだけじゃない——文章によるコミュニケーションを磨く場でもある。"
tags: ["code-review", "communication", "engineering-culture"]
lang: "ja"
---

## コードの書き方を変えたあのコメント

初めてプルリクエストのレビューで、コードの書き方を真剣に考え直すきっかけをもらった日のことを、今でも覚えています...
```
