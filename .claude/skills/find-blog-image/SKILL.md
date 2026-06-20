---
name: find-blog-image
description: Find a relevant, free-to-use image for a blog post, optimize it to webp, and save it into public/images/blog/ so it can be dropped into a <Figure>. Use when asked to find, search, add, or source an image for a blog post.
---

# Skill: Find Blog Image

**Trigger:** `/find-blog-image`

## Objective

Find a relevant, **freely licensed** image for a blog post, download and optimize it (resize + convert to `.webp`), save it into `public/images/blog/`, and return a ready-to-paste `<Figure>` snippet pointing at the new file.

## Constraints

- Save images **only** to `public/images/blog/`.
- Output filename must be **kebab-case**, derived from the post slug or topic (e.g. `ai-driven-development-with-claude.webp`).
- Prefer `.webp` (matches existing assets and keeps pages light). Use `.jpg`/`.png` only if conversion fails.
- **Only use images that are free to reuse** — Unsplash, Pexels, Pixabay, or Wikimedia Commons. Never hotlink or download copyrighted/stock-watermarked images.
- **Relevance comes first, mood is the tiebreaker.** The image must visibly relate to the post's subject — read the whole post and pick something on-topic (e.g. an AI-chat/assistant post wants chat bubbles, a conversation UI, or an AI/robot visual — not an unrelated texture). Only **among topically relevant candidates** do you then prefer the calmest / most palette-friendly one. Never trade away relevance just to get a muted color.
- **Look at the candidates — don't judge by color math.** You can view images. Download the top few candidates and **actually view them (Read the files)** to judge what they depict and their mood. Color statistics (dominant RGB/saturation) can confirm calmness but cannot tell you the subject, so they must never be the sole basis for the pick.
- **Aesthetic preference (after relevance):** lean toward calm, lower-saturation images with warm-neutral / muted teal / amber tones that harmonize with the RetroUI palette (paper `#faf6ec`, teal `#0f766e`, amber `#f59e0b`) and read well on **both** the light cream and dark near-black backgrounds. Avoid neon / high-contrast clashes (hot pink, electric cyan) when a calmer relevant option exists.
- Do **not** modify the `.mdx` post unless the user explicitly asks. By default, just save the image and hand back the `<Figure>` snippet.
- `sharp` is already a project dependency — use it for optimization (no new packages).
- Never overwrite an existing image in `public/images/blog/` without confirming with the user first.

## Workflow

1. **Determine the topic and filename.**
   - If given a post slug or file, read its frontmatter `title`/`description` to derive search keywords.
   - Pick an output filename from the slug, e.g. `public/images/blog/<slug>.webp`. Confirm it doesn't already exist (`ls public/images/blog/`); if it does, ask before overwriting.

2. **Search for a free-license image.**
   - Read the post first so the search reflects its actual subject. Query Unsplash / Pexels / Pixabay / Wikimedia Commons with the post's **key topic** terms, optionally adding calm modifiers (`minimal`, `muted`, `soft`) as a secondary nudge — but keep the topic in the query.
   - Use `WebFetch` on the search/candidate page to resolve several **direct image URLs** (the actual `.jpg`/`.png`/`.webp` assets) and confirm the license permits reuse. Avoid brand logos/trademarks (e.g. don't grab a "Gemini" or company logo) — use generic concept imagery instead.

3. **Shortlist and look.**
   - Download the **top 3–5 candidates** to `/tmp` and **view them** (Read each file) to judge subject and mood.
   - Pick the candidate that best **matches the post topic** and, among those, is the calmest / most palette-friendly and works on both light and dark backgrounds. Prefer landscape ~1200px+ wide.

4. **Optimize and save as webp** (the chosen candidate is already in `/tmp`; resize to max 1200px wide — or crop to a ~1200×600 landscape banner for a hero — quality 80):
   ```bash
   node -e "const sharp=require('sharp');sharp('/tmp/<CHOSEN>').resize({width:1200,withoutEnlargement:true}).webp({quality:80}).toFile('public/images/blog/<NAME>.webp').then(i=>console.log('saved',i.width+'x'+i.height,Math.round(i.size/1024)+'KB')).catch(e=>{console.error(e);process.exit(1)})"
   ```

5. **Verify** the file exists and is a reasonable size (`ls -la public/images/blog/<NAME>.webp`).

6. **Return the snippet** for the user to paste into the post, with a sensible `alt` and `caption`:
   ```mdx
   <Figure
     src="/images/blog/<NAME>.webp"
     alt="<descriptive alt text>"
     caption="<short caption>"
     priority
   />
   ```
   If the source requires attribution (e.g. some Wikimedia/Pexels assets), include the photographer/source credit in the caption or note it to the user.

## Notes

- The `<Figure>` component is globally available inside MDX — no import needed.
- `priority` is appropriate for an above-the-fold/hero image; drop it for images lower in the post.
- A missing image file does not break `npm run build` (Next resolves images at request time), but it will render broken in the browser — always verify the file landed before sharing the snippet.
