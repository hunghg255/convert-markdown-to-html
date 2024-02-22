<p align="center">
<a href="https://www.npmjs.com/package/convert-markdown-to-html" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/teenyicons:markdown-outline.svg?color=%2300bfff" alt="logo" width='100'/></a>
</p>

<p align="center">
  A script converts markdown to html
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/convert-markdown-to-html" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/csvs-parsers.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/convert-markdown-to-html" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/csvs-parsers.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=convert-markdown-to-html" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/convert-markdown-to-html" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/convert-markdown-to-html/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/convert-markdown-to-html/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/convert-markdown-to-html" alt="License" /></a>
</p>

## Features

- Support Syntax Highlighting
- Support Github Alert
- Support Emoji
- Support Table of Contents
- Support Mermaid
- Support Katex
- Support Twoslash

## Demo

[Demo](https://hunghg255.github.io/convert-markdown-to-html)

## API

```md
--i: input file
--o: output file
--t: title
--g: github link
```

## CLI

- Option 1

```bash
npx convert-markdown-to-html@latest --i README.md --o docs/index.html --t "Convert Markdown to HTML" --g "https://github.com/hunghg255/convert-markdown-to-html"
```

- Option 2

```bash
npm i convert-markdown-to-html@latest --save-dev
```

- Config (file package.json)

```json
{
  ...
  "scripts": {
    ...
    "gen-docs": "convert-markdown-to-html --i README.md --o docs/index.html --t \"Convert Markdown to HTML\" --g \"https://github.com/hunghg255/convert-markdown-to-html\""
  },
  ...
}
```

## Install

- Create a file `mdocs.config.ts` in the root of the project

```ts
import { defineConfig } from 'convert-markdown-to-html';

export default defineConfig({
  input: 'index.md',
  output: 'index.html',
  isTwoSlash: true,

  title: 'My Docs',
  description: 'My awesome documentation',

  logo: '',

  socialLinks: [
    {
      icon: 'twitter',
      url: 'https://github.com',
    },
    {
      icon: 'github',
      url: 'https://github.com',
    },
  ],
  footer: {
    message: 'Released under the MIT License',
    copyright: 'Copyright © 2023-present Hunghg255',
  },

  head: [
    [
      'link',
      { rel: 'icon', type: 'image/png', href: 'https://hung.thedev.id/images/patak-banner.jpg' },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@hunghg255' }],
    ['meta', { name: 'theme-color', content: '#7eaf90' }],
  ],
});
```

- Config (file package.json)

```json
{
  ...
  "scripts": {
    ...
    "gen-docs": "convert-markdown-to-html"
  },
  ...
}
```

## Function

```ts
import { markdownToDocs } from 'convert-markdown-to-html';

declare const markdownToDocs: (
  isTwoSlash: boolean;
  title: string;
  description?: string;
  logo?: string;
  socialLinks?: {
      icon?: 'twitter' | 'github';
      url?: string;
  }[];
  footer?: {
      message?: string;
      copyright?: string;
  };
  head?: Array<[string, Record<string, string>]>;
) => Promise<string>;

const markdownContent = `# Hello World`;
const html = markdownToDocs(markdownContent, {
  isTwoSlash: true,

  title: 'My Docs',
  description: 'My awesome documentation',

  logo: '',

  socialLinks: [
    {
      icon: 'twitter',
      url: 'https://github.com',
    },
    {
      icon: 'github',
      url: 'https://github.com',
    },
  ],
  footer: {
    message: 'Released under the MIT License',
    copyright: 'Copyright © 2023-present Hunghg255',
  },

  head: [
    [
      'link',
      { rel: 'icon', type: 'image/png', href: 'https://hung.thedev.id/images/patak-banner.jpg' },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@hunghg255' }],
    ['meta', { name: 'theme-color', content: '#7eaf90' }],
  ],
});
```

### About

<a href="https://www.buymeacoffee.com/hunghg255" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

Gia Hung – [hung.hg](https://hung.thedev.id)
