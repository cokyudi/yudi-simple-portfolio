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

- `/` → `app/page.tsx` — Portfolio home (About, experience timeline, CV link, contact CTAs)
- `/blog` → `app/blog/page.tsx` — Blog post grid
- `/blog/[slug]` → `app/blog/[slug]/page.tsx` — Individual post (statically generated)
- `/og/*` → `app/og/` — Dynamic Open Graph image generation
- `/api/chat` → `app/api/chat/route.ts` — AI assistant endpoint (server-only)
- `/feed.xml`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/manifest.webmanifest` — generated SEO/feed routes

**Key directories:**

- `app/` — Pages, layouts, API routes
- `components/` — UI components (most are `'use client'` for Framer Motion animations)
- `constants/` — Static data (`data.ts` for experience/social links) and i18n translations (`i18n.ts` for EN/JA)
- `context/` — `LanguageContext` for EN/JA language switching with localStorage persistence
- `lib/posts.ts` — MDX blog utilities (`getPostBySlug`, `getAllPosts`, `getAllPostSlugs`)
- `lib/knowledge.ts` — server-only reader that concatenates `knowledge/` + `posts/` into the assistant's grounding context
- `posts/` — MDX blog content with gray-matter frontmatter (`title`, `date`, `description`, `lang`)
- `knowledge/` — curated, public-safe assistant grounding (`profile.{en,ja}.md`, `faq.{en,ja}.md`); not rendered anywhere
- `types/` — TypeScript type definitions

Notable components: `components/Chat.tsx` (assistant widget), `components/ContactCTA.tsx` (end-of-page contact band), `components/ui/Button.tsx` (renders a plain `<a>` for external/`mailto`/`tel` hrefs, the view-transition `Link` otherwise).

## Blog Content System

Posts are `.mdx` files in `posts/` compiled at build time via `next-mdx-remote` (RSC variant) with `remark-gfm`. Pages are statically generated via `generateStaticParams()`. `lib/posts.ts` uses React `cache()` for deduplication.

## Internationalization

Bilingual EN/JA implemented via `LanguageContext` (client-side, localStorage-persisted) — **not** Next.js i18n routing. All copy lives in `constants/i18n.ts`.

Blog posts carry a `lang: 'en' | 'ja'` frontmatter field (defaults to `'en'` if absent). `app/blog/page.tsx` fetches all posts server-side and passes them to `components/BlogGrid.tsx` (a Client Component) which filters by the active language. Language toggle is hidden on individual post pages (`/blog/[slug]`) since the post language is fixed.

## Theming

Dark/light mode via `next-themes` with Tailwind `darkMode: 'class'`. `ThemeProvider` wraps the app in `app/providers.tsx`. A subtle theme-aware graph-paper grid background is applied to `body` in `styles/globals.css` (two `linear-gradient`s via `color-mix` on `--ink`, disabled under `prefers-reduced-motion`).

## AI Assistant

The "Ask about Yudi" chat (`components/Chat.tsx`) posts to `app/api/chat/route.ts`, which calls **Gemini** (`gemini-2.5-flash`) via the **AI SDK v6** (`generateText` from `ai` + `@ai-sdk/google`). Grounding comes from `lib/knowledge.ts` (curated `knowledge/` files + all `posts/`, globbed — new posts are included automatically). The system prompt is **scoped**: answer only from context, decline off-topic. Guardrails: per-IP in-memory rate limit, input-length cap, output-token cap.

- **Secret safety:** `GOOGLE_GENERATIVE_AI_API_KEY` is read server-side only — never `NEXT_PUBLIC_*`, never in the prompt or client bundle. Free tier, so no billing exposure.
- **Knowledge is public:** the repo is public, and the assistant exposes `knowledge/` content to anyone — keep it public-safe (no PII/secrets).

## View Transitions

`next-view-transitions` wraps the app (`ViewTransitions` in `app/providers.tsx`). Use its `Link` (not `next/link`) for internal navigation. Blog card title/date morph into the post via matching `viewTransitionName` (`post-title-${slug}` / `post-date-${slug}`); transition CSS lives in `styles/globals.css`, disabled under `prefers-reduced-motion`.

## Analytics & Conversions

GTM loads only when `GTM_ID` is set. Conversion events fire via `sendGTMEvent` from `@next/third-parties/google`: `cv_download` (CV button) and `contact_click` (hero + footer + ContactCTA, with `method`/`location` params).

## Path Aliases

`@/*` maps to `./*` (project root), configured in `tsconfig.json`.

## Notable Libraries

- **Framer Motion** — entrance and scroll animations throughout
- **@tailwindcss/typography** — prose styling for blog post content
- **next-mdx-remote** — MDX compilation for blog posts
- **gray-matter** — frontmatter parsing
- **next-themes** — theme management
- **next-view-transitions** — client-side view transitions (provider + `Link`)
- **ai** (AI SDK v6) + **@ai-sdk/google** — Gemini-backed assistant
- **@next/third-parties** — GTM + conversion events (`sendGTMEvent`)
- **@vercel/analytics** + **@vercel/speed-insights** — deployed on Vercel
- **sharp** — image optimization

## Code Style & Patterns

- **React Components:** Use functional components with arrow functions.
- **TypeScript:** Strict typing. Use `interface` for data structures and `type` for unions/aliases. Avoid `any`.
- **Internationalization:** NEVER hardcode strings in components. Always use `constants/i18n.ts` and the `useLanguage` hook.
- **Client vs Server:** Default to Server Components. Only use `'use client'` when Framer Motion, `useLanguage`, browser state, or `sendGTMEvent` is required.
- **Animations:** Use Framer Motion `variants` for consistency rather than inline `initial/animate` props.

## Critical Implementation Details

- **i18n Warning:** We do NOT use subpath routing (e.g., /ja/blog). We use a client-side context. If a component needs to change language, it MUST be a `'use client'` component.
- **Static Params:** `generateStaticParams` in `[slug]/page.tsx` only generates slugs; it does not handle language variations since language is toggled client-side.
- **Async params (Next.js 15+):** `params` in page components, `generateMetadata`, and `generateStaticParams` is now a `Promise` — always `await params` before accessing fields.
- **JSX.Element return type:** Do NOT annotate component return types as `JSX.Element` — the global `JSX` namespace was removed in `@types/react@19`. Let TypeScript infer return types.
- **ESLint flat config:** Uses `eslint.config.mjs` (ESLint 9 flat config via `FlatCompat`). Do not create `.eslintrc.json`.

## Environment Variables

- `GOOGLE_GENERATIVE_AI_API_KEY` — Gemini key for the assistant (server-only). Set in `.env.local` (gitignored) and Vercel. Assistant is inert without it.
- `GTM_ID` — optional; enables GTM/Analytics + conversion events.

## Agent Procedures

- **Before Coding:** Always check `constants/data.ts` to see how data is structured before suggesting a new component.
- **Verification:** After modifying an MDX utility in `lib/posts.ts` or `lib/knowledge.ts`, run `npm run build` to ensure static generation isn't broken. (Note: `app/og/*` font fetches can fail in sandboxed/offline builds — that's environmental, not a code error.)
- **Safety:** Do not modify `.mdx` files in `posts/` unless specifically asked to edit content.
- **Secrets:** Never commit secrets; keep keys server-side only. The repo is public.
- **Assistant grounding:** `knowledge/` and `posts/` are public and exposed via the assistant — keep new content public-safe.
