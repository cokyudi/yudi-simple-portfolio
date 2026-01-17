export const i18n = {
  en: {
    about: {
      greeting: 'Hello!',
      summary: [
        'I’m a full-stack engineer who enjoys building fast and accessible web applications.',
        'Always learning and looking for ways to improve, both technically and personally.',
      ],
      downloadCV: 'Download my CV here',
      readBlog: 'Read my blog →',
    },
    heading: 'Experiences',
    experience: {
      'treasury-fulltime': {
        title: 'Full-stack Engineer',
        desc: 'My first full-time job in Japan, contributing to company products.',
      },
      'treasury-parttime': {
        title: 'Part-time Full-stack Engineer',
        desc: 'My first experience working in Tokyo, Japan.',
      },
      dgit: {
        title: 'Front-end Engineer',
        desc: 'Worked on design, development, and maintenance of front-end products.',
      },
      mii: {
        title: 'Application Developer',
        desc: 'Worked at a major Indonesian bank as a web developer.',
      },
      graduation: {
        title: 'Graduation',
        desc: 'Majored in Computer Science.',
      },
      avatar: {
        title: 'Part-time Web Developer',
        desc: 'Developed and maintained web-based client projects.',
      },
    },
  },

  ja: {
    about: {
      greeting: 'こんにちは！',
      summary: [
        '私はフルスタックエンジニアで、高速でアクセシブルなWebアプリケーションを作ることを楽しんでいます。',
        '技術的にも個人的にも、常に学び、改善する方法を探しています。',
      ],
      downloadCV: 'ここから履歴書をダウンロード',
      readBlog: 'ブログを読む →',
    },
    heading: '職務経歴',
    experience: {
      'treasury-fulltime': {
        title: 'フルスタックエンジニア',
        desc: '日本での初めての正社員として、プロダクト開発に貢献。',
      },
      'treasury-parttime': {
        title: 'パートタイム・フルスタックエンジニア',
        desc: '東京での初めての就業経験。',
      },
      dgit: {
        title: 'フロントエンドエンジニア',
        desc: 'フロントエンドを中心に設計・開発・保守を担当。',
      },
      mii: {
        title: 'アプリケーション開発者',
        desc: 'インドネシア最大手銀行でWeb開発を担当。',
      },
      graduation: {
        title: '卒業',
        desc: 'コンピュータサイエンス専攻。',
      },
      avatar: {
        title: 'パートタイムWeb開発者',
        desc: 'クライアント向けWebアプリを開発・保守。',
      },
    },
  },
} as const;

export type Language = keyof typeof i18n;
export type I18nSchema = typeof i18n;