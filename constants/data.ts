export type ExperienceId =
  | 'meets-fulltime'
  | 'treasury-fulltime'
  | 'treasury-parttime'
  | 'dgit'
  | 'mii'
  | 'graduation'
  | 'avatar';

export type ExperienceBase = {
  id: ExperienceId;
  company: string;
  year: string;
  // Omit for the current, ongoing role (rendered as "– Present") and for
  // point-in-time milestones like graduation (rendered as the year alone).
  endYear?: string;
  companyLink: string;
};

export type ProjectId = 'tangocho' | 'portfolio';

export type Project = {
  id: ProjectId;
  name: string;
  url: string;
  tech: string[];
};

export const userData: {
  experience: ExperienceBase[];
  projects: Project[];
  socialLinks: {
    linkedin: string;
    github: string;
    email: string;
  };
  resumeUrl: { en: string; ja: string }
} = {
  projects: [
    {
      id: 'tangocho',
      name: 'tangocho (単語帳)',
      url: 'https://tangocho.yudidputra.com',
      tech: ['Next.js', 'TypeScript', 'Supabase', 'Gemini', 'PWA'],
    },
    {
      id: 'portfolio',
      name: 'This portfolio + AI assistant',
      url: 'https://github.com/cokyudi/yudi-simple-portfolio',
      tech: ['Next.js', 'TypeScript', 'Tailwind', 'AI SDK', 'MDX'],
    },
  ],
  experience: [
    {
      id: 'meets-fulltime',
      company: 'Meets Consulting Inc.',
      year: '2026-05',
      endYear: '2026-07',
      companyLink: 'https://www.meetsc.co.jp/',
    },
    {
      id: 'treasury-fulltime',
      company: 'TREASURY INC.',
      year: '2023-03',
      endYear: '2026-04',
      companyLink: 'https://www.treasury.jp/',
    },
    {
      id: 'treasury-parttime',
      company: 'TREASURY INC.',
      year: '2022-12',
      endYear: '2023-02',
      companyLink: 'https://www.treasury.jp/',
    },
    {
      id: 'dgit',
      company: 'DGIT Systems',
      year: '2019-11',
      endYear: '2022-03',
      companyLink: 'https://www.dgitsystems.com/',
    },
    {
      id: 'mii',
      company: 'Mitra Integrasi Informatika',
      year: '2018-11',
      endYear: '2019-10',
      companyLink: '',
    },
    {
      id: 'graduation',
      company: 'Udayana University',
      year: '2018-08',
      companyLink: 'https://www.unud.ac.id/',
    },
    {
      id: 'avatar',
      company: 'Avatar Solutions',
      year: '2018-02',
      endYear: '2018-08',
      companyLink: 'https://avatarsolution.com/',
    },
  ],
  socialLinks: {
    linkedin: 'https://linkedin.com/in/cokyudi',
    github: 'https://github.com/cokyudi',
    email: 'cokagungyudi@gmail.com',
  },
  resumeUrl: {
    // EN visitors get the English CV; JA visitors get the 職務経歴書.
    en: 'https://drive.google.com/file/d/1EXOF96Y5XCKkk88_XZeuwhlN4VN8g0gV/view?usp=sharing',
    ja: 'https://drive.google.com/file/d/11UA4PmlMxShcN0sfM7Zmf4_nAn7wzqIt/view?usp=sharing',
  }
};
  