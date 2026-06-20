import 'server-only';

import fs from 'fs';
import path from 'path';
import { cache } from 'react';

const knowledgeDir = path.join(process.cwd(), 'knowledge');

// Reads and concatenates all markdown files in /knowledge as grounding context
// for the site assistant. Cached so the files are read once per request lifecycle.
export const getKnowledge = cache((): string => {
  const files = fs
    .readdirSync(knowledgeDir)
    .filter((file) => file.endsWith('.md'))
    .sort();

  return files
    .map((file) => fs.readFileSync(path.join(knowledgeDir, file), 'utf8'))
    .join('\n\n---\n\n');
});
