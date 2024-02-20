import { defineConfig } from 'convert-markdown-to-html';

export default defineConfig({
  input: 'index.md',
  output: 'index.html',
  title: 'My Docs',
  githubCornor: 'https://github.com',
  isTwoSlash: true,
});
