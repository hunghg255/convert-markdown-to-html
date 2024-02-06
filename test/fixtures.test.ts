/// <reference types="vite/client" />

import { describe, expect, it } from 'vitest';

import { markdownToDocs } from '../src';

describe('fixtures', () => {
  const files = import.meta.glob('./input/*.md', { as: 'raw', eager: true });
  const filter = process.env.FILTER;
  for (const [path, content] of Object.entries(files)) {
    const run = !filter || path.includes(filter) ? it : it.skip;

    run(`render ${path}`, async () => {
      const c = await markdownToDocs(content, path, 'https://example.com');

      expect(c).toMatchFileSnapshot(path.replace('input', 'output').replace('.md', '.html'));
    });
  }
});
