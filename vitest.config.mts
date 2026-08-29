import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Resolves the @/* alias from tsconfig.json.
    tsconfigPaths: true,
    alias: {
      // lib/posts.ts imports 'server-only', which throws outside an RSC build.
      'server-only': fileURLToPath(new URL('./test/server-only.stub.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next'],
  },
});
