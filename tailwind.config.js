/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        fg: 'var(--fg)',
        accent: 'var(--accent)',
        'on-accent': 'var(--on-accent)',
        highlight: 'var(--highlight)',
        muted: 'var(--muted)',
      },
      boxShadow: {
        'retro-sm': '2px 2px 0 0 var(--shadow)',
        retro: '4px 4px 0 0 var(--shadow)',
        'retro-lg': '6px 6px 0 0 var(--shadow)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'var(--font-noto-sans-jp)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-geist-sans)', 'ui-sans-serif', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--fg)',
            '--tw-prose-headings': 'var(--fg)',
            '--tw-prose-lead': 'var(--muted)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-bold': 'var(--ink)',
            '--tw-prose-counters': 'var(--muted)',
            '--tw-prose-bullets': 'var(--ink)',
            '--tw-prose-hr': 'var(--ink)',
            '--tw-prose-quotes': 'var(--ink)',
            '--tw-prose-quote-borders': 'var(--accent)',
            '--tw-prose-captions': 'var(--muted)',
            '--tw-prose-code': 'var(--ink)',
            '--tw-prose-pre-code': '#ede9e0',
            '--tw-prose-pre-bg': '#1b1916',
            '--tw-prose-th-borders': 'var(--ink)',
            '--tw-prose-td-borders': 'var(--ink)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};