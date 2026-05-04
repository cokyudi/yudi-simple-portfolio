# Skill: Create Blog Post

**Trigger:** `/new-post`

## Objective

Scaffold a new bilingual blog post (English + Japanese) in the `posts/` directory following the project's established conventions — correct frontmatter, slug naming, MDX structure, and a matching `-ja` counterpart.

## Constraints

- Always create **two files**: `posts/[slug].mdx` (English) and `posts/[slug]-ja.mdx` (Japanese).
- Slugs must be **kebab-case**, descriptive, and URL-safe (e.g. `my-new-post`).
- The English file must **omit** the `lang` field (defaults to `'en'`). The Japanese file must include `lang: "ja"`.
- `date` must use `YYYY-MM-DD` format matching today's date unless the user specifies otherwise.
- Do **not** hardcode strings in components — blog content lives only in `.mdx` files.
- Do **not** modify `lib/posts.ts`, `app/blog/`, or any component unless explicitly asked.
- The MDX body must use valid JSX syntax. Use the `<Figure>` component for images when needed (it is globally available in MDX).
- Keep the writing tone personal and conversational, consistent with existing posts.

## Workflow

1. **Gather info:** Ask the user for (or infer from context):
   - Post title (EN + JA)
   - Short description / subtitle (EN + JA)
   - Slug (suggest one from the title if not provided)
   - Rough content outline or key points to cover
2. **Create English post** at `posts/[slug].mdx` with the frontmatter and a drafted MDX body.
3. **Create Japanese post** at `posts/[slug]-ja.mdx` with translated frontmatter (`lang: "ja"`) and a translated MDX body.
4. **Verify** both files have the correct frontmatter fields (`title`, `date`, `description`, and `lang` for JA only) and the slug filenames match.
5. **Confirm** to the user that the files are ready and remind them to run `npm run build` to validate static generation.

## Frontmatter Schema

### English (`posts/[slug].mdx`)

```mdx
---
title: "Post Title in English"
date: "YYYY-MM-DD"
description: "A one-sentence summary of the post."
---
```

### Japanese (`posts/[slug]-ja.mdx`)

```mdx
---
title: "日本語のタイトル"
date: "YYYY-MM-DD"
description: "投稿の一文要約。"
lang: "ja"
---
```

## Example Output

**Slug:** `lessons-from-code-review`

`posts/lessons-from-code-review.mdx`

```mdx
---
title: "What Code Reviews Taught Me About Communication"
date: "2026-05-04"
description: "Code review is not just about catching bugs — it is a masterclass in written communication."
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
lang: "ja"
---

## コードの書き方を変えたあのコメント

初めてプルリクエストのレビューで、コードの書き方を真剣に考え直すきっかけをもらった日のことを、今でも覚えています...
```
