export const i18n = {
  en: {
    about: {
      greeting: 'Hello, I’m',
      name: 'Yudi Dharma Putra',
      summary: [
        'I’m a full-stack engineer who enjoys building fast and accessible web applications.',
        'Always learning and looking for ways to improve, both technically and personally.',
      ],
      downloadCV: 'Download my CV here',
      readBlog: 'Read my blog →',
      getInTouch: 'Get in touch',
      current: 'Current',
    },
    blog: {
      heading: 'Blog',
      subtitle: 'Notes on learning, experiments, and experiences.',
      readMore: 'Read more →',
      emptyState: 'No posts available in English yet.',
      contents: 'Contents',
      minRead: 'min read',
    },
    contact: {
      heading: 'Let’s build something together',
      subtitle:
        'Have a project or idea in mind? I’m always up for interesting collaborations — let’s talk.',
      email: 'Email me',
      linkedin: 'Connect on LinkedIn',
    },
    chat: {
      open: 'Ask about Yudi',
      title: 'Ask about Yudi',
      greeting:
        'Hi! Ask me anything about Yudi’s experience, skills, or projects.',
      placeholder: 'Ask about my experience…',
      send: 'Send',
      close: 'Close chat',
      error: 'Something went wrong. Please try again.',
      suggestions: [
        'What’s Yudi’s tech stack?',
        'Tell me about his AI work',
        'How can I contact him?',
      ],
    },
    heading: 'Experiences',
    experience: {
      'meets-fulltime': {
        title: 'Senior Full-stack Engineer',
        desc: 'EC x DX AI-driven product development 0 → 1, contributing to the company’s growth.',
      },
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
      greeting: 'こんにちは、',
      name: 'Yudi Dharma Putra',
      summary: [
        '私はフルスタックエンジニアで、高速でアクセシブルなWebアプリケーションを作ることを楽しんでいます。',
        '技術的にも個人的にも、常に学び、改善する方法を探しています。',
      ],
      downloadCV: 'ここから履歴書をダウンロード',
      readBlog: 'ブログを読む →',
      getInTouch: 'お問い合わせ',
      current: '現職',
    },
    blog: {
      heading: 'ブログ',
      subtitle: '学び、実験、そして経験についてのメモ。',
      readMore: '続きを読む →',
      emptyState: 'まだ日本語の記事はありません。',
      contents: '目次',
      minRead: '分で読む',
    },
    contact: {
      heading: '一緒に何かを作りましょう',
      subtitle:
        'プロジェクトやアイデアはありますか？面白いコラボレーションはいつでも歓迎です。お気軽にご連絡ください。',
      email: 'メールする',
      linkedin: 'LinkedInでつながる',
    },
    chat: {
      open: 'Yudiについて質問',
      title: 'Yudiについて質問',
      greeting:
        'こんにちは！Yudiの経歴・スキル・プロジェクトについて何でも聞いてください。',
      placeholder: '経歴について質問…',
      send: '送信',
      close: 'チャットを閉じる',
      error: 'エラーが発生しました。もう一度お試しください。',
      suggestions: [
        'Yudiの技術スタックは？',
        'AI関連の仕事について教えて',
        '連絡方法は？',
      ],
    },
    heading: '職務経歴',
    experience: {
      'meets-fulltime': {
        title: 'シニアフルスタックエンジニア',
        desc: 'EC x DX AI駆動のプロダクト開発0→1に携わり、会社の成長に貢献。',
      },
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