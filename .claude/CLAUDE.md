# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (next/core-web-vitals + next/typescript)
```

No test suite is configured.

## Architecture

Next.js 16 (React 19) **App Router** portfolio site with a blog.

**Routing:**

- `/` → `app/page.tsx` — Portfolio home (About, experience timeline, CV link)
- `/blog` → `app/blog/page.tsx` — Blog post grid
- `/blog/[slug]` → `app/blog/[slug]/page.tsx` — Individual post (statically generated)
- `/og/*` → `app/og/` — Dynamic Open Graph image generation

**Key directories:**

- `app/` — Pages, layouts, API routes
- `components/` — UI components (most are `'use client'` for Framer Motion animations)
- `constants/` — Static data (`data.ts` for experience/social links) and i18n translations (`i18n.ts` for EN/JA)
- `context/` — `LanguageContext` for EN/JA language switching with localStorage persistence
- `lib/posts.ts` — MDX blog utilities (`getPostBySlug`, `getAllPosts`, `getAllPostSlugs`)
- `posts/` — MDX blog content with gray-matter frontmatter (`title`, `date`, `description`, `lang`)
- `types/` — TypeScript type definitions

## Blog Content System

Posts are `.mdx` files in `posts/` compiled at build time via `next-mdx-remote` (RSC variant) with `remark-gfm`. Pages are statically generated via `generateStaticParams()`. `lib/posts.ts` uses React `cache()` for deduplication.

## Internationalization

Bilingual EN/JA implemented via `LanguageContext` (client-side, localStorage-persisted) — **not** Next.js i18n routing. All copy lives in `constants/i18n.ts`.

Blog posts carry a `lang: 'en' | 'ja'` frontmatter field (defaults to `'en'` if absent). `app/blog/page.tsx` fetches all posts server-side and passes them to `components/BlogGrid.tsx` (a Client Component) which filters by the active language. Language toggle is hidden on individual post pages (`/blog/[slug]`) since the post language is fixed.

## Theming

Dark/light mode via `next-themes` with Tailwind `darkMode: 'class'`. `ThemeProvider` wraps the app in `app/providers.tsx`.

## Path Aliases

`@/*` maps to `./*` (project root), configured in `tsconfig.json`.

## Notable Libraries

- **Framer Motion** — entrance and scroll animations throughout
- **@tailwindcss/typography** — prose styling for blog post content
- **next-mdx-remote** — MDX compilation for blog posts
- **gray-matter** — frontmatter parsing
- **next-themes** — theme management
- **@vercel/analytics** + **@vercel/speed-insights** — deployed on Vercel
- **sharp** — image optimization

## Code Style & Patterns

- **React Components:** Use functional components with arrow functions.
- **TypeScript:** Strict typing. Use `interface` for data structures and `type` for unions/aliases. Avoid `any`.
- **Internationalization:** NEVER hardcode strings in components. Always use `constants/i18n.ts` and the `useLanguage` hook.
- **Client vs Server:** Default to Server Components. Only use `'use client'` when Framer Motion or `useLanguage` is required.
- **Animations:** Use Framer Motion `variants` for consistency rather than inline `initial/animate` props.

## Critical Implementation Details

- **i18n Warning:** We do NOT use subpath routing (e.g., /ja/blog). We use a client-side context. If a component needs to change language, it MUST be a `'use client'` component.
- **Static Params:** `generateStaticParams` in `[slug]/page.tsx` only generates slugs; it does not handle language variations since language is toggled client-side.
- **Async params (Next.js 15+):** `params` in page components, `generateMetadata`, and `generateStaticParams` is now a `Promise` — always `await params` before accessing fields.
- **JSX.Element return type:** Do NOT annotate component return types as `JSX.Element` — the global `JSX` namespace was removed in `@types/react@19`. Let TypeScript infer return types.
- **ESLint flat config:** Uses `eslint.config.mjs` (ESLint 9 flat config via `FlatCompat`). Do not create `.eslintrc.json`.

## Agent Procedures

- **Before Coding:** Always check `constants/data.ts` to see how data is structured before suggesting a new component.
- **Verification:** After modifying an MDX utility in `lib/posts.ts`, run `npm run build` to ensure static generation isn't broken.
- **Safety:** Do not modify `.mdx` files in `posts/` unless specifically asked to edit content.
