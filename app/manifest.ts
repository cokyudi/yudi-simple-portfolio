import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yudi Dharma Putra',
    short_name: 'Yudi DP',
    description:
      'Full-stack engineer in Japan specializing in Next.js, React, and modern web development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf6ec',
    theme_color: '#0f766e',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
