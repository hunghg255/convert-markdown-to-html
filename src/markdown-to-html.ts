/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable quotes */
// @ts-nocheck
import markdownItShikiji from '@shikijs/markdown-it';
import {
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationDiff,
  transformerRenderWhitespace,
  transformerNotationWordHighlight,
  // ...
} from '@shikijs/transformers';
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';
import { fromHtml } from 'hast-util-from-html';
import MarkdownItDiagrams from 'markdown-diagrams';
import MarkdownIt from 'markdown-it';
import MarkdownItAbbr from 'markdown-it-abbr';
import MarkdownItCodeGroup from 'markdown-it-code-group';
import MarkdownItContainer from 'markdown-it-container';
import MarkdownItDeflist from 'markdown-it-deflist';
import { full as MarkdownItEmoji } from 'markdown-it-emoji';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts';
import MarkdownItIns from 'markdown-it-ins';
import mila from 'markdown-it-link-attributes';
import MarkdownItMagicLink from 'markdown-it-magic-link';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItTable from 'markdown-it-multimd-table';
import MarkdownItKatex from 'md-it-katex';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { defaultHandlers, toHast } from 'mdast-util-to-hast';
import theme from 'shikiji-themes/themes/lucy.js';

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
  ${title ? `<h5><span class="circle1"></span><span class="circle2"></span><span class="circle3"></span>${title}</h5>` : ''}

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
        const endIndex = i;
        const firstContent = tokens
          .slice(startIndex, endIndex + 1)
          .find((token) => token.type === 'inline');

        if (!firstContent) {
          continue;
        }

        const slug = stringToSlug(firstContent.content);

        open.meta = {
          slug,
        };
      }
    }
  });

  md.renderer.rules.heading_open = function (tokens, idx) {
    if (tags.has(tokens[idx].tag)) {
      return `<${tokens[idx].tag} class="heading-anchor" id="${tokens[idx].meta?.slug}"><a class="anchor" href="#${tokens[idx].meta?.slug}">#</a>`;
    }

    return '';
  };
};

function renderMarkdown(this: any, md: string): any[] {
  const mdast = fromMarkdown(
    md.replaceAll(/{@link ([^}]*)}/g, '$1'), // replace jsdoc links
    { mdastExtensions: [gfmFromMarkdown()] },
  );

  return (
    toHast(mdast, {
      handlers: {
        code: (state, node) => {
          const lang = node.lang || '';
          if (lang) {
            return this.codeToHast(node.value, {
              ...this.options,
              transformers: [],
              lang,
            }).children[0] as Element;
          }
          return defaultHandlers.code(state, node);
        },
      },
    }) as Element
  ).children;
}

function renderMarkdownInline(this: any, md: string, context?: string): any[] {
  if (context === 'tag:param') {
    md = md.replace(/^([\w$-]+)/, '`$1` ');
  }

  const children = renderMarkdown.call(this, md);
  if (children.length === 1 && children[0].type === 'element' && children[0].tagName === 'p') {
    return children[0].children;
  }
  return children;
}

const isBracket = (str) => {
  if (!str) {
    return false;
  }

  return (
    str.includes('(') ||
    str.includes(')') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}')
  );
};

const transformerBracketPairColor = (options): ShikiTransformer => {
  const colors = options?.color || {
    '(': '#ffd700',
    ')': '#ffd700',
    '[': '#da70d6',
    ']': '#da70d6',
    '{': '#179fff',
    '}': '#179fff',
  };

  return {
    name: 'shiki-brackets-color',
    root: (root) => {
      const pre = root.children[0] as Element;
      const code = pre.children[0] as Element;

      code.children = code.children.reduce((acc, item) => {
        if (item.type === 'element' && item.children?.length > 0) {
          const newChild = [];
          for (const child of item.children) {
            if (child.children?.length) {
              for (const child1 of child.children) {
                if (isBracket(child1.value)) {
                  // eslint-disable-next-line unicorn/prefer-spread
                  const a = child1.value.split('');
                  const b = a.map((it) => {
                    const d = {
                      ...child,
                      children: [
                        {
                          type: 'text',
                          value: it,
                        },
                      ],
                    };

                    if (isBracket(it)) {
                      d.properties = {
                        style: `color: ${colors[it]}`,
                      };
                    }

                    return d;
                  });

                  newChild.push(...b);
                } else {
                  newChild.push(child);
                }
              }
            } else {
              newChild.push(child);
            }
          }

          item.children = newChild;

          acc.push(item);
        } else {
          acc.push(item);
        }

        return acc;
      }, []);
    },
  };
};

export const markdownToHtml = async (markdown: string, isTwoSlash: boolean): string => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    xhtmlOut: true,
  });

  const mdDocs = new MarkdownIt({
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
  md.use(MarkdownItMagicLink);
  md.use(MarkdownItDiagrams, {
    showController: true, // show controller,default:false
    /**
     * PlantUML options
     * ditaa:imageFormat 'png| txt'
     * plantuml: imageFormat'png| svg| txt'
     * dot: imageFormat'png| svg| txt'
     */
    // imageFormat: 'svg', // image format:svg|png|txt,default:svg
    // server: '', // plantuml server,default:http://www.plantuml.com/plantuml
    // ditaa: {
    // imageFormat: 'svg', // image format:png|txt,default:svg
    // server: '', // plantuml server,default:http://www.plantuml.com/plantuml
    // }
  });
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

  md.use(mila, {
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  });

  mdDocs.use(MarkdownItEmoji);
  mdDocs.use(MarkdownItAbbr);
  mdDocs.use(MarkdownItDeflist);
  mdDocs.use(MarkdownItFootnote);
  mdDocs.use(MarkdownItIns);
  mdDocs.use(MarkdownItMark);

  mdDocs.use(mila, {
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
    transformerRenderWhitespace(),
    transformerNotationWordHighlight(),
    transformerBracketPairColor({
      colors: {
        '(': '#ffd700',
        ')': '#ffd700',
        '[': '#da70d6',
        ']': '#da70d6',
        '{': '#179fff',
        '}': '#179fff',
      },
    }),
  ];

  mdDocs.use(
    await markdownItShikiji({
      highlightLines: false,
      themes: {
        light: theme,
        dark: theme,
      },
      transformers,
    }),
  );

  if (isTwoSlash) {
    transformers.push(
      transformerTwoslash({
        renderer: rendererRich({
          classExtra: 'ingore-twoslash',
          processHoverDocs: (docs) => {
            const contentHtml = [mdDocs.render(docs)].join('\n').trim().replaceAll('\r\n', '\n');

            return contentHtml;
          },
          renderMarkdown: (content) => {
            const hast = fromHtml(content, { space: 'p', fragment: true }).children;

            return hast;
          },
          renderMarkdownInline,
        }),
        explicitTrigger: true,
      }),
    );
  }

  md.use(
    await markdownItShikiji({
      highlightLines: false,
      themes: {
        light: theme,
        dark: theme,
      },
      transformers,
    }),
  );

  const contentHtml = [md.render(markdown)].join('\n').trim().replaceAll('\r\n', '\n');

  return contentHtml;
};
