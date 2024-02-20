import { markdownToHtml } from './markdown-to-html';

type TOptions = {
  input: string;
  output: string;
  title: string;
  githubCornor: string;
  isTwoSlash: boolean;
};

export const defineConfig = (config: TOptions): TOptions => {
  return config;
};

export const markdownToDocs = async (
  markdown: string,
  title: string,
  githubCorner: string,
  isTwoSlash?: boolean,
): Promise<string> => {
  const matterResult = await markdownToHtml(markdown, !!isTwoSlash);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Documentation'}</title>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/convert-markdown-to-html@0.0.30/dist/style.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-github-alerts/styles/github-colors-light.css">
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/markdown-it-github-alerts/styles/github-colors-dark-media.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-github-alerts/styles/github-base.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-code-group/styles/code-group-colors-light.css">
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/markdown-it-code-group/styles/code-group-colors-dark-media.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-code-group/styles/code-group-base.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/floating-ui@5.2.4/dist/style.css">

<script type="module" src="https://unpkg.com/@uiw/github-corners/lib/index.js?module"></script>
</head>
<body>
<github-corners target="__blank" position="fixed"
href="${githubCorner}"></github-corners>

  <main>
    ${matterResult}
  </main>

<script>
document.addEventListener('DOMContentLoaded', () => {
  function getTextExcept(element, exclude) {
    return worker(element);

    function worker(node, text = '') {
      // @ts-ignore
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.nodeValue;
        // @ts-ignore
      } else if (node.nodeType === Node.ELEMENT_NODE && exclude && !node.matches(exclude)) {
        for (const child of node.childNodes) {
          text = worker(child, text);
        }
      }
      return text;
    }
  }

  const copyContent = async (text) => {
    try {
      // @ts-ignore
      await navigator.clipboard.writeText(text);
    } catch (error) {
      // @ts-ignore
      console.error('Failed to copy:', error);
    }
  };

  const eleCopy = document.querySelectorAll('.markdown-it-code-copy');

  if (eleCopy?.length) {
    eleCopy.forEach((el) => {
      const btn = el.querySelector('.btn-copy');
      btn.addEventListener('click', () => {
        const content = getTextExcept(el.querySelector('pre'), '.ingore-twoslash');

        copyContent(content);
        btn.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#6bbd71" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"/></svg>\`;
        const t = setTimeout(() => {
          btn.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#555555" d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V7q0-.425.288-.712T4 6q.425 0 .713.288T5 7v13h10q.425 0 .713.288T16 21q0 .425-.288.713T15 22zm4-6V4z"/></svg>\`;
          clearTimeout(t);
        }, 1200);
      });
    });
  }

  const eleCodeGroups = document.querySelectorAll('.markdown-code-group');

  const removeCodeBlockClass = (el) => {
    const codeBlocks = el.querySelectorAll('.code-blocks-group');
    codeBlocks.forEach((el) => {
      el.classList.remove('active');
    });
  };

  const removeTabClass = (el) => {
    const codeBlocks = el.querySelectorAll('.markdown-group-tab-item');
    codeBlocks.forEach((el) => {
      el.classList.remove('active');
    });
  };

  const initCodeGroupActive = (el) => {
    const tabActive = el.querySelector('.markdown-group-tab-item.active');
    const dataCodeGroupActive = tabActive?.dataset.codeGroup;

    const codeActive = el.querySelector(\`.code-blocks-group.\${dataCodeGroupActive}\`);

    if (codeActive) {
      codeActive.classList.add('active');
    }
  };

  if (eleCodeGroups?.length) {
    eleCodeGroups.forEach((el) => {
      const btns = el.querySelectorAll('.markdown-group-tab-item');

      initCodeGroupActive(el);

      btns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const dataCodeGroup = btn.dataset.codeGroup;

          removeCodeBlockClass(el);
          removeTabClass(el);

          const code = el.querySelector(\`.code-blocks-group.\${dataCodeGroup}\`);
          code.classList.add('active');
          btn.classList.add('active');
        });
      });
    });
  }



}, false);
</script>

<script type="module" defer>
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true, theme: 'dark' });

  const mermaidElement = document.querySelectorAll('.markdown-it-mermaid');

      if (mermaidElement?.length) {
        mermaidElement.forEach(async (el) => {
          const content = el?.textContent;
          if (content) {
            const type = mermaid.detectType(content);
            const { svg } = await mermaid.render(type, content);
            el.innerHTML = svg;
            el.classList.remove('opacity-0');
          }
        });
      }
</script>
<script type="module" defer>
import { createTooltip, recomputeAllPoppers } from 'https://cdn.jsdelivr.net/npm/floating-ui@5.2.4/dist/floating-ui.mjs';

      const eleTwoslash = document.querySelectorAll(
        '.twoslash-hover:not(.twoslash-query-presisted)',
      );
      const eleTwoslashCursor = document.querySelectorAll('.twoslash-completion-cursor');
      const eleTwoslashPersisted = document.querySelectorAll('.twoslash-query-presisted');

      if (typeof window !== 'undefined') {
        // Recompute poppers when clicking on a tab
        window.addEventListener(
          'click',
          (e) => {
            // const path = e.composedPath();
            // if (
            //   path.some(
            //     (el: any) =>
            //       el?.classList?.contains?.('vp-code-group') || el?.classList?.contains?.('tabs'),
            //   )
            // )
            //   recomputeAllPoppers();
            recomputeAllPoppers();
          },
          { passive: true },
        );
      }

      const isMobile =
        typeof navigator !== 'undefined' &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (eleTwoslash?.length) {
        eleTwoslash.forEach((el) => {
          const twpslashEle = el.querySelector('.twoslash-popup-container');

          const tooltip = createTooltip(
            el,
            {
              content: twpslashEle.outerHTML,
              html: true,
              triggers: isMobile ? ['touch'] : ['hover', 'touch'],
              popperTriggers: isMobile ? ['touch'] : ['hover', 'touch'],
              placement: 'bottom-start',
              overflowPadding: 10,
              delay: 0,
              handleResize: false,
              autoHide: true,
              instantMove: true,
              flip: false,
              arrowPadding: 8,
              autoBoundaryMaxSize: true,
              popperClass: 'v-popper--theme-twoslash',
            },
            {},
          );
        });
      }
      if (eleTwoslashCursor?.length) {
        eleTwoslashCursor.forEach((el) => {
          const twpslashEle = el.querySelector('.twoslash-completion-list');

          const tooltip = createTooltip(
            el,
            {
              content: twpslashEle.outerHTML,
              html: true,
              triggers: ['click'],
              popperTriggers: ['click'],
              placement: 'bottom-start',
              autoHide: false,
              distance: 0,
              arrowOverflow: true,
              popperClass:
                'v-popper--theme-twoslash twoslash-floating-hide',
            },
            {},
          );

          tooltip.show();
        });
      }
      if (eleTwoslashPersisted?.length) {
        eleTwoslashPersisted.forEach((el) => {
          const twpslashEle = el.querySelector('.twoslash-popup-container');

          const tooltip = createTooltip(
            el,
            {
              content: twpslashEle.outerHTML,
              html: true,
              triggers: ['click'],
              popperTriggers: ['click'],
              placement: 'bottom-start',
              autoHide: false,
              popperClass: 'v-popper--theme-twoslash',
            },
            {},
          );

          tooltip.show();
        });
      }
</script>
</body>
</html>
`;
};
