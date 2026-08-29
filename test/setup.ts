import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Testing Library only registers its own cleanup when Vitest globals are on.
// Tests here import describe/it/expect explicitly, so unmount between them by
// hand — otherwise rendered DOM accumulates and queries match earlier cases.
afterEach(cleanup);
