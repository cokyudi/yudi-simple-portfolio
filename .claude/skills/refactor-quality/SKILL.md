# Skill: Refactor for Quality (SEO, Accessibility, Performance, Security)

**Trigger:** `/refactor`

## Objective

Audit and refactor a given file or component in this Next.js/React codebase to improve SEO, accessibility (a11y), runtime performance, and security — without changing visible behavior or introducing new features.

## Constraints

- **No behavior changes.** Refactors must be semantically equivalent — same output, same props API, same routing.
- **Preserve code style.** Follow the project's conventions: functional components, arrow functions, strict TypeScript, no `any`, `interface` for data shapes, `type` for unions/aliases.
- **Server vs. Client boundary.** Only add `'use client'` if strictly required (e.g. hooks, Framer Motion). Default to Server Components.
- **No new dependencies** unless the improvement is significant and the package is widely adopted (ask first).
- **Scope changes to what was asked.** Do not refactor unrelated files or add unrelated features.
- **Do not hardcode strings.** Any user-facing copy must go through `constants/i18n.ts` and the `useLanguage` hook.
- **OWASP Top 10 aware.** Flag and fix any injection risks, insecure data handling, or exposed secrets found in scope.

## Workflow

1. **Read the target file** fully before suggesting any change.
2. **Audit across four dimensions** (see checklist below) and list every finding with severity: 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low.
3. **Prioritize** — fix Critical and High issues; surface Medium/Low as follow-up notes unless the user asks for a full pass.
4. **Apply fixes** one dimension at a time, explaining each change inline with a short comment if non-obvious.
5. **Validate** by checking for TypeScript errors (`npm run lint`) and confirming no build-breaking changes (`npm run build` if structural changes were made).
6. **Report** a concise summary: what was changed, what was skipped, and any remaining recommendations.

## Audit Checklist

### SEO

- [ ] Every page exports `generateMetadata()` with `title`, `description`, `openGraph`, and `twitter` fields.
- [ ] `<title>` and `<meta name="description">` are unique per page and under character limits (60 / 160).
- [ ] Images use meaningful `alt` text (not empty, not "image").
- [ ] Heading hierarchy is correct (`h1` → `h2` → `h3`); only one `h1` per page.
- [ ] Canonical URLs are set where relevant.
- [ ] Structured data (`JSON-LD`) is present for blog posts.
- [ ] `robots` meta or `robots.txt` is not inadvertently blocking indexing.

### Accessibility (a11y — WCAG 2.1 AA)

- [ ] All interactive elements are keyboard-navigable and have visible focus styles.
- [ ] Buttons and links have accessible labels (`aria-label`, `aria-labelledby`, or visible text).
- [ ] Images have descriptive `alt` text; decorative images use `alt=""`.
- [ ] Color contrast meets 4.5:1 for normal text, 3:1 for large text.
- [ ] Forms have associated `<label>` elements.
- [ ] Landmark roles (`main`, `nav`, `footer`, `header`) are present.
- [ ] `aria-*` attributes are used correctly and not redundantly.
- [ ] Skip-to-content link is present for keyboard users.
- [ ] Motion respects `prefers-reduced-motion` (Framer Motion: use `useReducedMotion`).

### Performance

- [ ] Images use `next/image` with explicit `width`/`height` and `priority` only on above-the-fold images.
- [ ] Heavy Client Components are split with `dynamic()` and lazy-loaded where appropriate.
- [ ] Fonts use `next/font` (no `@import` in CSS).
- [ ] No layout shift caused by missing `width`/`height` on media elements.
- [ ] Memoization (`useMemo`, `useCallback`, `React.memo`) is applied only where profiling justifies it — not preemptively.
- [ ] Server Components avoid importing large client-only libraries.
- [ ] Unused imports and dead code are removed.

### Security (OWASP Top 10)

- [ ] No secrets, API keys, or tokens in client-side code or committed files (use env vars).
- [ ] User-supplied content is never rendered with `dangerouslySetInnerHTML` without sanitization.
- [ ] External links use `rel="noopener noreferrer"`.
- [ ] `Content-Security-Policy`, `X-Frame-Options`, and other security headers are configured in `next.config.js`.
- [ ] Dependencies are not obviously outdated with known CVEs (flag for `npm audit`).
- [ ] No path traversal risks in file-system utilities (e.g. `lib/posts.ts` slug handling).

## Example Output

**Target:** `components/BlogCard.tsx`

**Findings:**

- 🟠 High [a11y] — `<a>` wraps entire card but has no accessible label; screen readers read raw URL.
- 🟡 Medium [SEO] — `alt` text on thumbnail is `"thumbnail"` — not descriptive.
- 🟢 Low [Security] — External link missing `rel="noopener noreferrer"`.

**Changes applied:**

```tsx
// Before
<a href={href}>
  <img src={thumbnail} alt="thumbnail" />
</a>

// After — aria-label provides context; alt describes the image; rel secures external link
<a href={href} aria-label={`Read post: ${title}`} rel="noopener noreferrer">
  <img src={thumbnail} alt={`Cover image for "${title}"`} />
</a>
```

**Skipped (follow-up):**

- Structured data (JSON-LD) for blog posts — recommend adding to `app/blog/[slug]/page.tsx`.
