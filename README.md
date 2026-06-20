# Yudi Simple Portfolio

A personal website built with the **Next.js App Router**, serving as my **portfolio**, **CV hub**, and **bilingual technical blog** — with an AI assistant that answers questions about my background.

It's both a public-facing site and a playground where I experiment with modern web development: server components, view transitions, performance, SEO, i18n, and AI integration.

🔗 Live site: https://www.yudidputra.com/

---

## ✨ Features

- **Portfolio homepage** — about, experience timeline, downloadable CV, and contact CTAs
- **Bilingual (EN / JA)** — client-side language switching via React context, all copy in `constants/i18n.ts`
- **Blog** — MDX content, statically generated, per-post language
- **AI assistant** — "Ask about Yudi" chat grounded only on curated `knowledge/` files (Gemini Flash), scoped to decline off-topic requests
- **View transitions** — title/date morph from blog cards into posts; cross-fade elsewhere
- **Theming** — dark / light mode with a subtle graph-paper grid background
- **SEO** — Metadata API, dynamic Open Graph images, RSS feed, sitemap, robots, JSON-LD, canonical URLs, `llms.txt`
- **Analytics & conversions** — Vercel Analytics + Speed Insights, Google Analytics via GTM, `cv_download` / `contact_click` events

---

## 🛠 Tech Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** · **Framer Motion** · **next-themes** · **next-view-transitions**
- **MDX** (`next-mdx-remote`) for blog content
- **AI SDK v6** + **@ai-sdk/google** (Gemini) for the assistant
- **Vercel** (hosting, Analytics, Speed Insights) · **Google Analytics** (GTM)

---

## 📂 Project Structure

```
app/                 # App Router pages, layouts, routes
  ├─ blog/           # Blog index and post pages
  ├─ og/             # Dynamic Open Graph image routes
  ├─ api/chat/       # AI assistant endpoint (server-side)
  ├─ feed.xml/       # RSS feed
  ├─ llms.txt/       # AI-crawler index
  ├─ sitemap.ts      # Sitemap · robots.ts · manifest.ts
  ├─ layout.tsx      # Root layout
  └─ page.tsx        # Homepage (portfolio)

components/           # UI components (Chat widget, cards, CTAs, …)
constants/           # Static data (data.ts) and i18n strings (i18n.ts)
context/             # LanguageContext (EN/JA)
knowledge/           # Assistant grounding (not rendered): profile + FAQ, EN/JA
lib/                 # MDX helpers (posts.ts), knowledge reader (knowledge.ts)
posts/               # Blog content (MDX)
public/              # Static assets
styles/              # Global styles
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/cokyudi/yudi-simple-portfolio.git
cd yudi-simple-portfolio
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
```

### Environment variables

Create `.env.local` (gitignored — never commit secrets):

```bash
GOOGLE_GENERATIVE_AI_API_KEY=...   # Gemini key (free, from aistudio.google.com) — powers the assistant
GTM_ID=GTM-XXXXXXX                 # optional — enables Google Tag Manager / Analytics
```

The assistant only responds when `GOOGLE_GENERATIVE_AI_API_KEY` is set. The key is read server-side only and is never sent to the browser or into the model prompt.

---

## 🤖 AI Assistant

The "Ask about Yudi" chat is grounded **only** on the markdown files in `knowledge/` (curated, public-safe career info). The `/api/chat` route stuffs that context into a scoped system prompt that politely declines anything off-topic. Guardrails: per-IP rate limit, input-length and output-token caps. Runs on Gemini's free tier, so there's no billing exposure.

---

## 📝 Blog Content

Posts live in `posts/` as MDX, supporting Markdown, embedded React components, and custom layouts (figures, code blocks). Each post carries a `lang: 'en' | 'ja'` frontmatter field; the blog grid filters by the active language.

---

## 📄 License

Open for learning and inspiration — feel free to explore the code.
