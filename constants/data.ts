export type ExperienceId =
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

export const userData: {
  experience: ExperienceBase[];
  socialLinks: {
    linkedin: string;
    github: string;
  };
  resumeUrl: string
} = {
  experience: [
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
  },
  resumeUrl: 'https://drive.google.com/file/d/1etom04V4sRfe9-h7a5aDrIVLlxj3cmLg/view'
};
  