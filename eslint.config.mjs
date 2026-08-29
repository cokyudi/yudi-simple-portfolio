import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = [
  { ignores: ['.next/**', 'out/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  {
    // Tailwind/PostCSS load these as CommonJS; `require` is correct here.
    files: ['*.config.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
];

export default eslintConfig;
