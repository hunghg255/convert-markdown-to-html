/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable quotes */
// @ts-nocheck
import markdownItShikiji from '@shikijs/markdown-it';
import {
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationDiff,
  // ...
} from '@shikijs/transformers';
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';
import matter from 'gray-matter';
import { fromHtml } from 'hast-util-from-html';
import MarkdownIt from 'markdown-it';
import MarkdownItAbbr from 'markdown-it-abbr';
import MarkdownItCodeGroup from 'markdown-it-code-group';
import MarkdownItContainer from 'markdown-it-container';
import MarkdownItDeflist from 'markdown-it-deflist';
import { full as MarkdownItEmoji } from 'markdown-it-emoji';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts';
import MarkdownItIns from 'markdown-it-ins';
import MarkdownItKatex from 'markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItTable from 'markdown-it-multimd-table';

import { svgCopy } from './svg';
import { stringToSlug } from './utils';

const getTitle = (info: string) => {
  const infoS = info.split(' ');
  const title = infoS.find((i) => i.startsWith('title='));
  return title ? title.split('=')[1] : '';
};

const getBash = (info: string) => {
  if (!info.includes('bash') && !info.includes('sh')) {
    return '';
  }

  if (info.includes('pnpm')) {
    return 'pnpm';
  }
  if (info.includes('npm')) {
    return 'npm';
  }
  if (info.includes('yarn')) {
    return 'yarn';
  }
  if (info.includes('bun')) {
    return 'bun';
  }
};

function renderCode(md, origRule) {
  return (...args) => {
    const [tokens, idx] = args;

    const content = tokens[idx].content.replaceAll('"', '&quot;').replaceAll("'", '&apos;');
    const info = tokens[idx].info ? md.utils.escapeHtml(tokens[idx].info) : '';

    const langName = info.split(/\s+/g)[0];
    const title = getTitle(info);
    const bash = getBash(info);

    const origRendered = origRule(...args);

    if (content.length === 0 || langName === 'mermaid') {
      return origRendered;
    }

    return `
<div class="code-blocks markdown-it-code-copy ${title ? 'code-blocks-title' : ''} ${bash || langName ? `code-blocks-group ${bash || langName} ${bash === 'npm' ? 'active' : ''}` : ''}">
  ${title ? `<h5>${title}</h5>` : ''}

  <div class="code-blocks-pre">
    ${origRendered}
    <span class="code-blocks-lang">${langName}</span>
    <button class="btn-copy">
      ${svgCopy}
    </button>
  </div>
</div>
`;
  };
}

function renderCodeMermaid(md, origRule) {
  return (...args) => {
    const [tokens, idx] = args;
    const content = tokens[idx].content.replaceAll('"', '&quot;').replaceAll("'", '&apos;');
    const info = tokens[idx].info ? md.utils.escapeHtml(tokens[idx].info) : '';

    const langName = info.split(/\s+/g)[0];

    const origRendered = origRule(...args);

    if (content.length === 0) {
      return origRendered;
    }

    if (langName !== 'mermaid') {
      return origRendered;
    }

    return `<div class="markdown-it-mermaid opacity-0">${origRendered}</div>`;
  };
}

const tags = new Set(['h2', 'h3', 'h4', 'h5', 'h6']);

const MarkdownItGitHubAlerts1: MarkdownIt.PluginWithOptions<MarkdownItGitHubAlertsOptions> = (
  md,
) => {
  md.core.ruler.after('block', 'markdown-id-heading-anchor', (state) => {
    const tokens = state.tokens;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'heading_open') {
        const open = tokens[i];

        const startIndex = i;
        while (tokens[i]?.type !== 'heading_close' && i <= tokens.length) {
          i += 1;
        }
        // const close = tokens[i];
        const endIndex = i;
        const firstContent = tokens
          .slice(startIndex, endIndex + 1)
          .find((token) => token.type === 'inline');

        if (!firstContent) {
          continue;
        }

        const slug = stringToSlug(firstContent.content);

        // open.attrs = [['id', slug]];
        open.meta = {
          slug,
        };
      }
    }
  });

  md.renderer.rules.heading_open = function (tokens, idx) {
    if (tags.has(tokens[idx].tag)) {
      return `<${tokens[idx].tag} id="${tokens[idx].meta?.slug}"><a class="anchor" href="#${tokens[idx].meta?.slug}">#</a>`;
    }

    return '';
  };
};

export const markdownToHtml = async (markdown: string, isTwoSlash: boolean): string => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    xhtmlOut: true,
  });

  md.use(MarkdownItGitHubAlerts1);
  md.use(MarkdownItKatex);
  md.use(MarkdownItGitHubAlerts);
  md.use(MarkdownItCodeGroup);
  md.use(MarkdownItEmoji);
  md.use(MarkdownItAbbr);
  md.use(MarkdownItContainer, 'spoiler', {
    validate: function (params) {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },

    render: function (tokens, idx) {
      const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';
      } else {
        // closing tag
        return '</details>\n';
      }
    },
  });
  md.use(MarkdownItDeflist);
  md.use(MarkdownItFootnote);
  md.use(MarkdownItIns);
  md.use(MarkdownItMark);
  md.use(MarkdownItTable, {
    multiline: false,
    rowspan: false,
    headerless: false,
    multibody: true,
    aotolabel: true,
  });
  md.use((md, options) => {
    md.renderer.rules.code_block = renderCode(md, md.renderer.rules.code_block, options);
    md.renderer.rules.fence = renderCode(md, md.renderer.rules.fence, options);
  });
  md.use((md, options) => {
    md.renderer.rules.code_block = renderCodeMermaid(md, md.renderer.rules.code_block, options);
    md.renderer.rules.fence = renderCodeMermaid(md, md.renderer.rules.fence, options);
  });

  md.use(mila, {
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  });

  const transformers = [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationFocus(),
    transformerNotationErrorLevel(),
  ];

  if (isTwoSlash) {
    transformers.push(
      transformerTwoslash({
        renderer: rendererRich({
          classExtra: 'ingore-twoslash',
          processHoverDocs: (docs) => {
            const contentHtml = [md.render(docs)].join('\n').trim().replaceAll('\r\n', '\n');

            return contentHtml;
          },
          renderMarkdown: (content) => {
            const hast = fromHtml(content, { space: 'p', fragment: true }).children;

            return hast;
          },
        }),
        explicitTrigger: true,
      }),
    );
  }

  md.use(
    await markdownItShikiji({
      highlightLines: false,
      themes: {
        light: 'vitesse-dark',
        dark: 'vitesse-dark',
      },
      transformers,
    }),
  );

  const matterResult = matter(markdown);

  const contentHtml = [md.render(matterResult.content)].join('\n').trim().replaceAll('\r\n', '\n');

  return contentHtml;
};
