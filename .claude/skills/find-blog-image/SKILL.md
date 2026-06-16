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
- Do **not** modify the `.mdx` post unless the user explicitly asks. By default, just save the image and hand back the `<Figure>` snippet.
- `sharp` is already a project dependency — use it for optimization (no new packages).
- Never overwrite an existing image in `public/images/blog/` without confirming with the user first.

## Workflow

1. **Determine the topic and filename.**
   - If given a post slug or file, read its frontmatter `title`/`description` to derive search keywords.
   - Pick an output filename from the slug, e.g. `public/images/blog/<slug>.webp`. Confirm it doesn't already exist (`ls public/images/blog/`); if it does, ask before overwriting.

2. **Search for a free-license image.**
   - Use `WebSearch` to find a fitting image on Unsplash / Pexels / Pixabay / Wikimedia Commons, querying with the post's key concepts.
   - Use `WebFetch` on the candidate page to resolve a **direct image URL** (the actual `.jpg`/`.png`/`.webp` asset) and confirm the license permits reuse.
   - Prefer landscape images roughly 1200px+ wide for a clean hero/figure.

3. **Download to a temp file.**
   ```bash
   curl -sL "<DIRECT_IMAGE_URL>" -o /tmp/blog-image-src
   file /tmp/blog-image-src   # sanity-check it's actually an image
   ```

4. **Optimize and save as webp** (resize to max 1200px wide, quality 80):
   ```bash
   node -e "const sharp=require('sharp');sharp('/tmp/blog-image-src').resize({width:1200,withoutEnlargement:true}).webp({quality:80}).toFile('public/images/blog/<NAME>.webp').then(i=>console.log('saved',i.width+'x'+i.height,Math.round(i.size/1024)+'KB')).catch(e=>{console.error(e);process.exit(1)})"
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
