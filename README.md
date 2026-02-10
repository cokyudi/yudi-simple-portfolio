# Yudi Simple Portfolio
A personal website built with **Next.js App Router**, serving as my **portfolio**, **CV hub**, and **technical blog**.

This project is both a public-facing site and a learning playground where I experiment with modern web development concepts such as server components, performance optimization, SEO, and analytics.

🔗 Live site: https://www.yudidputra.com/

---

## ✨ Features
- **Portfolio homepage**
  - Work experience overview
  - Downloadable CV
- **Blog**
  - Written in MDX
  - Static generation with incremental updates
- **Performance-focused**
  - Optimized images
  - Modern font loading
- **SEO-ready**
  - Metadata API
  - Open Graph images
- **Analytics**
  - Vercel Analytics
  - Google Analytics

---

## 🛠 Tech Stack
- **Next.js 14** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **MDX**
- **Framer Motion**
- **Vercel**
- **Vercel Analytics**
- **Google Analytics**

---

## 📂 Project Structure
```tsx
app/                # App Router pages and layouts
  ├─ blog/           # Blog index and blog detail pages
  ├─ og/             # Dynamic Open Graph image routes
  ├─ layout.tsx      # Root layout
  └─ page.tsx        # Homepage (portfolio)

components/          # Reusable UI components
constants/           # Navigation links and static constants
lib/                 # Utilities (MDX helpers, data fetching)
posts/               # Blog content written in MDX
public/              # Static assets (images, CV PDF)
styles/              # Global styles and Tailwind config

```

This structure keeps routing, content, UI, and logic clearly separated and easy to scale.

---

## 🧠 Why I Built This
Instead of using a ready-made template or blogging platform, I wanted to:
- Build something fully under my control
- Practice real **Next.js patterns**
- Learn by shipping and iterating
- Have a long-term place to document what I learn

This site will continue to evolve as my skills and interests grow.

---

## 🚀 Getting Started (Local Development)
```tsx
git clone https://github.com/cokyudi/yudi-simple-portfolio.git
cd yudi-simple-portfolio
npm install
npm run dev
```
Then open:  
http://localhost:3000

---
## 📝 Blog Content
Blog posts live in the `posts/` directory and are written in MDX, allowing:
- Markdown content
- Embedded React components
- Custom layouts (e.g. figures, code blocks)

---

## 📈 Analytics & Monitoring
- **Vercel Analytics** for performance and traffic insights
- **Google Analytics** for visitor behavior and page tracking

This helps me understand how the site is used and where to improve.

---

## 🔮 Future Improvements
Some ideas I plan to explore next:
- Server Actions & mutations
- Blog search
- RSS feed
- Improved Core Web Vitals
- More advanced animations
- Deeper technical blog posts

## 📄 License
This project is open for learning and inspiration.  
Feel free to explore the code.
