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
  resumeUrl: string
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
      companyLink: 'https://www.meetsc.co.jp/',
    },
    {
      id: 'treasury-fulltime',
      company: 'TREASURY INC.',
      year: '2023-03',
      companyLink: 'https://www.treasury.jp/',
    },
    {
      id: 'treasury-parttime',
      company: 'TREASURY INC.',
      year: '2022-12',
      companyLink: 'https://www.treasury.jp/',
    },
    {
      id: 'dgit',
      company: 'DGIT Systems',
      year: '2019-11',
      companyLink: 'https://www.dgitsystems.com/',
    },
    {
      id: 'mii',
      company: 'Mitra Integrasi Informatika',
      year: '2018-11',
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
      companyLink: 'https://avatarsolution.com/',
    },
  ],
  socialLinks: {
    linkedin: 'https://linkedin.com/in/cokyudi',
    github: 'https://github.com/cokyudi',
    email: 'cokagungyudi@gmail.com',
  },
  resumeUrl: 'https://drive.google.com/file/d/1uHb_EamHVgZelREGH1EFUxv4eS5mxO6W/view?usp=sharing'
};
  