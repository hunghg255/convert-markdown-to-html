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

  <style>
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    padding: 0 26px;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
  display: inline-block;
  }
  a,
  a:hover,
  a:active,
  a:focus {
    color: inherit;
  }
  img,
video {
  width: 100%;
  height: auto;
}

</style>

<style>
  .has-diff {
    position: relative;
  }

  .has-diff .line {
    display: inline-block;
    width: 100%;
  }

  .has-diff .diff {
    margin: 0 -24px;
    padding: 0 24px;
    width: calc(100% + 48px);
    display: inline-block;
  }

  .has-diff code .line:last-child {
    display: none;
  }

  .has-diff .diff.add {
    background-color: #0505;
  }

  .has-diff .diff.remove {
    background-color: #8005;
  }

  .has-diff .diff:before {
    position: absolute;
    left: 0;
    padding-left: 6px;
  }

  .has-diff .diff.add:before {
    content: '+';
    color: #3dd68c;
    border-left: 1px solid #10b981;
  }

  .has-diff .diff.remove:before {
    content: '-';
    color: #cb7676;
    border-left: 1px solid #f43f5e;
  }

  .has-highlighted .line.highlighted {
    background-color: rgba(101, 117, 133, 0.16);
    margin: 0 -24px;
    padding: 0 24px;
    width: calc(100% + 48px);
    display: inline-block;
  }

  .has-highlighted .line.highlighted.error {
    background-color: rgba(244, 63, 94, 0.16);
  }

  .has-highlighted .line.highlighted.warning {
    background-color: rgba(234, 179, 8, 0.16);
  }

  .has-focused .line:not(.focused) {
    filter: blur(0.095rem);
    opacity: 0.4;
    transition:
      filter 0.35s,
      opacity 0.35s;
  }

  .has-focused:hover .line:not(.focused) {
    filter: blur(0);
    opacity: 1;
  }

  .highlighted-word {
    background-color: #202127;
    border: 1px solid #3c3f44;
    padding: 1px 3px;
    margin: -1px -3px;
    border-radius: 4px;
  }
</style>

<style>

:root {
  --background: #050505;
  --primary: #fff;
  --secondary: #ccc;
  --tertiary: #7d7d7d;
  --accent: #f09000;
  --red: #fc533e;
  --font-mono: ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, 'andale mono',
    monospace !important;
  --highlight-color: #f25f4c;
}

* {
  box-sizing: border-box;
  font-family: var(--font-mono);
}

a {
  color: var(--accent);
}

a:hover {
  color: var(--highlight-color);
}

body {
  margin: 0;
  background-color: var(--background);
  color: var(--primary);
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  font-synthesis: style;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #492c00b3;
  border-radius: 4px;
  transition: all 300ms ease-in-out;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
  transition: all 300ms;
}

</style>

<style>
/* ===== Basic ===== */
:root {
  --twoslash-border-color: #8888885d;
  --twoslash-jsdoc-color: #fff;
  --twoslash-underline-color: currentColor;
  --twoslash-popup-bg: #0f0f0f;
  --twoslash-popup-shadow: rgba(0, 0, 0, 0.08) 0px 1px 4px;
  --twoslash-matched-color: #8cccd5;
  --twoslash-unmatched-color: #888;
  --twoslash-cursor-color: #8cccd5;
  --twoslash-error-color: #d45656;
  --twoslash-error-bg: #d4565620;
  --twoslash-tag-color: #3772cf;
  --twoslash-tag-bg: #3772cf20;
  --twoslash-tag-warn-color: #c37d0d;
  --twoslash-tag-warn-bg: #c37d0d20;
  --twoslash-tag-annotate-color: #1ba673;
  --twoslash-tag-annotate-bg: #1ba67320;
  --twoslash-code-font: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  --twoslash-unmatched-color: rgba(235, 235, 245, 0.6);
  --twoslash-docs-color: rgba(255, 255, 245, 0.86);
}

/* Respect people's wishes to not have animations */
@media (prefers-reduced-motion: reduce) {
  .twoslash * {
    transition: none !important;
  }
}

/* ===== Hover Info ===== */
.twoslash:hover .twoslash-hover {
  border-color: var(--twoslash-underline-color);
}

.twoslash .twoslash-hover {
  border-bottom: 1px dotted transparent;
  transition-timing-function: ease;
  transition: border-color 0.3s;
  position: relative;
}

.twoslash .twoslash-popup-container {
  /* position: absolute;
  top: 2px;
  opacity: 0; */
  display: inline-block;
  /* transform: translateY(1.1em); */
  background: var(--twoslash-popup-bg);
  border: 1px solid var(--twoslash-border-color);
  transition: opacity 0.3s;
  border-radius: 4px;
  padding: 4px 6px;
  pointer-events: none;
  z-index: 10;
  user-select: none;
  text-align: left;
  box-shadow: var(--twoslash-popup-shadow);

  /* position: fixed; */
  width: max-content;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  max-width: 600px;
  white-space: pre-wrap;
}

.twoslash .twoslash-query-presisted .twoslash-popup-container {
  z-index: 9;
  /* transform: translateY(1.5em); */
}

.twoslash .twoslash-hover:hover .twoslash-popup-container,
.twoslash .twoslash-query-presisted .twoslash-popup-container {
  opacity: 1;
  pointer-events: auto;
}

.twoslash .twoslash-popup-container:hover {
  user-select: auto;
}

.twoslash .twoslash-popup-arrow {
  position: absolute;
  top: -4px;
  left: 1em;
  border-top: 1px solid var(--twoslash-border-color);
  border-right: 1px solid var(--twoslash-border-color);
  background: var(--twoslash-popup-bg);
  transform: rotate(-45deg);
  width: 6px;
  height: 6px;
  pointer-events: none;
}

.twoslash .twoslash-popup-docs {
  color: var(--twoslash-jsdoc-color);
  padding: 6px 10px;
  font-family: sans-serif;
  font-size: 0.8em;
  margin: 0 -6px;
  border-top: 1px solid var(--twoslash-border-color);
}

.twoslash.twoslash h1,
.twoslash.twoslash h2,
.twoslash.twoslash h3,
.twoslash.twoslash h4,
.twoslash.twoslash h5,
.twoslash.twoslash h6,
.twoslash.twoslash p {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-family: inherit;
}

.twoslash.twoslash a:hover {
  background-color: initial !important;
}

/* ===== Error Line ===== */
.twoslash .twoslash-error-line {
  position: relative;
  background-color: var(--twoslash-error-bg);
  border-left: 3px solid var(--twoslash-error-color);
  color: var(--twoslash-error-color);
  padding: 6px 6px;
  margin: 0.2em 0;
}

.twoslash .twoslash-error {
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%206%203'%20enable-background%3D'new%200%200%206%203'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23c94824'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    repeat-x bottom left;
  padding-bottom: 2px;
}

/* ===== Completeions ===== */
.twoslash .twoslash-completion-cursor {
  position: relative;
}

.twoslash .twoslash-completion-list {
  /* user-select: none; */
  /* position: absolute;
  top: 0;
  left: 0; */
  /* transform: translate(0, 1.2em); */
  display: inline-block;
  width: 240px;
  background: var(--twoslash-popup-bg);
  border: 1px solid var(--twoslash-border-color);
  font-size: 0.8rem;
  margin: 3px 0 0 -1px;
  padding: 4px;
  z-index: 8;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: var(--twoslash-popup-shadow);

  /* position: fixed; */
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  /* max-width: 600px; */
  white-space: pre-wrap;
}

/* Custom Tags */
.twoslash .twoslash-tag-line {
  position: relative;
  background-color: var(--twoslash-tag-bg);
  border-left: 3px solid var(--twoslash-tag-color);
  color: var(--twoslash-tag-color);
  padding: 6px 6px;
  margin: 0.2em 0;
  display: flex;
  align-items: center;
  gap: 0.3em;
}
.twoslash .twoslash-tag-line .twoslash-tag-icon {
  width: 1.1em;
  color: inherit;
  display: flex;
}
.twoslash .twoslash-tag-line.twoslash-tag-error-line {
  background-color: var(--twoslash-error-bg);
  border-left: 3px solid var(--twoslash-error-color);
  color: var(--twoslash-error-color);
}
.twoslash .twoslash-tag-line.twoslash-tag-warn-line {
  background-color: var(--twoslash-tag-warn-bg);
  border-left: 3px solid var(--twoslash-tag-warn-color);
  color: var(--twoslash-tag-warn-color);
}
.twoslash .twoslash-tag-line.twoslash-tag-annotate-line {
  background-color: var(--twoslash-tag-annotate-bg);
  border-left: 3px solid var(--twoslash-tag-annotate-color);
  color: var(--twoslash-tag-annotate-color);
}

:root {
  --vp-c-bg: #1b1b1f;
  --vp-c-text-1: rgba(255, 255, 245, 0.86);
  --vp-c-text-2: rgba(235, 235, 245, 0.6);
  --vp-font-family-base: 'Chinese Quotes', 'Inter var', 'Inter', ui-sans-serif, system-ui,
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  --vp-font-family-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;

  --vp-code-font-size: 0.875em;
  --vp-c-border: #3c3f44;
  --vp-c-brand: #83d0da50;
  --vp-z-index-local-nav: 20;

  --twoslash-popup-bg: var(--vp-c-bg, inherit);
  --twoslash-popup-color: var(--vp-c-text-1);
  --twoslash-docs-color: var(--vp-c-text-1);
  --twoslash-docs-font: var(--vp-font-family-base);
  --twoslash-code-font: var(--vp-font-family-mono);
  --twoslash-code-size: var(--vp-code-font-size);
  --twoslash-underline-color: #8888;
  --twoslash-border-color: var(--vp-c-border);
  --twoslash-cursor-color: var(--vp-c-brand);
  /* --twoslash-matched-color: var(--vp-c-brand); */
  --twoslash-unmatched-color: var(--vp-c-text-2);
  --vp-code-line-height: 1.7;
}

.v-popper--theme-twoslash.v-popper--theme-twoslash.v-popper--theme-twoslash {
  z-index: calc(var(--vp-z-index-local-nav) - 1);
}

.v-popper--theme-twoslash.v-popper--theme-twoslash.v-popper--theme-twoslash .v-popper__inner {
  background: var(--twoslash-popup-bg);
  /* color: var(--twoslash-popup-color); */
  border-color: var(--twoslash-border-color);
  padding: 0;
}

.v-popper--theme-twoslash.v-popper--theme-twoslash.v-popper--theme-twoslash .v-popper__arrow-outer {
  border-color: var(--twoslash-border-color);
}

.v-popper--theme-twoslash.v-popper--theme-twoslash.v-popper--theme-twoslash .v-popper__arrow-inner {
  border-color: var(--twoslash-popup-bg);
}

.twoslash-popup-container {
  transform: translateY(1.5em);
}

.twoslash-query-presisted .twoslash-popup-container {
  transform: translateY(1.8em);
}

.twoslash .v-popper {
  display: inline-block;
}

.twoslash-completion-list .twoslash-completions-icon {
  color: var(--twoslash-unmatched-color) !important;
}

.twoslash-floating.twoslash-floating .twoslash-popup-code {
  max-width: 600px;
  display: block;
  width: fit-content;
  min-width: 100%;
  padding: 6px 12px;
  line-height: var(--vp-code-line-height);
  font-size: var(--twoslash-code-size);
  transition: color 0.5s;
  white-space: pre-wrap;
}

.twoslash-floating.twoslash-floating .twoslash-popup-docs,
.twoslash-floating.twoslash-floating .twoslash-popup-error {
  padding: 0px 12px 0px 12px !important;
  font-family: var(--twoslash-docs-font);
  font-size: 0.9em;
  max-height: 500px;
  max-width: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  text-wrap: balance;
}

.twoslash-floating.twoslash-floating .twoslash-popup-docs {
  border-top: 1px solid var(--twoslash-border-color);
  color: var(--twoslash-docs-color);
}

.twoslash-floating.twoslash-floating .twoslash-popup-error {
  color: var(--twoslash-error-color);
}

.twoslash-floating.twoslash-floating .twoslash-popup-error.twoslash-error-level-warning {
  color: var(--twoslash-warn-color);
}

.twoslash-floating.twoslash-floating .twoslash-popup-docs p,
.twoslash-floating.twoslash-floating .twoslash-popup-error p {
  margin: 0;
  padding: 6px 0;
  text-wrap: balance;
}

.twoslash-floating.twoslash-floating
  .twoslash-popup-docs
  pre
  .twoslash-floating.twoslash-floating
  .twoslash-popup-error
  pre {
  background-color: var(--vp-code-block-bg);
  border-radius: 8px;
  padding: 12px;
  margin: 6px -2px;
  overflow-x: auto;
}

.twoslash-floating.twoslash-floating .twoslash-popup-docs-tags {
  display: flex;
  flex-direction: column;
  padding: 8px 12px !important;
}

.twoslash-floating.twoslash-floating .twoslash-popup-docs-tags .twoslash-popup-docs-tag-name {
  font-family: var(--twoslash-code-font);
  color: var(--twoslash-unmatched-color);
  margin-right: 0.5em;
}

.twoslash-completion-cursor {
  height: 1.2em;
  width: 2px;
  margin-bottom: -0.2em;
  background: var(--twoslash-cursor-color);
  display: inline-block;
  user-select: none;
}

.twoslash-floating-show.twoslash-floating-show .v-popper__arrow-container {
  display: none;
}

.twoslash-floating.twoslash-floating .twoslash-completion-list {
  color: var(--twoslash-popup-color);
  padding: 6px;
  font-family: var(--twoslash-code-font);
  font-size: var(--twoslash-code-size) !important;
  margin: 0 !important;
}

/* Icons */
.twoslash-floating.twoslash-floating .twoslash-completion-list .twoslash-completions-icon {
  color: var(--twoslash-unmatched-color);
  width: 1em;
  flex: none;
}

.twoslash-floating.twoslash-floating
  .twoslash-completion-list
  li
  span.twoslash-completion-unmatched {
  color: var(--twoslash-unmatched-color);
}

.twoslash-floating.twoslash-floating .twoslash-completion-list .deprecated {
  text-decoration: line-through;
  opacity: 0.5;
}

.twoslash-floating.twoslash-floating
  .twoslash-completion-list
  li
  span.twoslash-completions-matched {
  color: var(--twoslash-matched-color);
}

.twoslash-floating.twoslash-floating .twoslash-completion-list .twoslash-completions-icon svg {
  width: 10px;
  height: 10px;
}

.twoslash-floating.twoslash-floating .twoslash-completion-list li {
  padding: 3px 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.25em;
  line-height: 1em;
}

.twoslash-floating.twoslash-floating :not(pre, h1, h2, h3, h4, h5, h6) > code {
  color: #8cccd5;
}

</style>

<style>
  .code-blocks {
    position: relative;
  }

  .code-blocks-title {
    border-radius: 6px;
    background-color: #090909;
  }

  .code-blocks-title h5 {
    margin: 0;
    padding: 4px;
    color: #878787;
    border-bottom: 1px solid #505050;
    font-size: 12px;
    font-style: italic;
  }

  .code-blocks-title .circle1,
.code-blocks-title .circle2,
.code-blocks-title .circle3 {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  transform: translateY(1px);
}

.code-blocks-title .circle1 {
  background-color: #ff5f56;
}

.code-blocks-title .circle2 {
  background-color: #ffbd2e;
  margin: 0 5px;
}

.code-blocks-title .circle3 {
  background-color: #27c93f;
  margin: 0 8px 0 0;
}

  .code-blocks-pre {
    position: relative;
    margin: 0 0 16px;
  }

  .code-blocks-pre :not(pre,h1,h2,h3,h4,h5,h6)>code {
    color: #8cccd5;
  }

  .code-blocks-pre .tab,
  .code-blocks-pre .space {
    position: relative;
  }

  .code-blocks-pre .tab::before {
    content: '⇥';
    position: absolute;
    opacity: 0.3;
  }

  .code-blocks-pre .space::before {
    content: '·';
    position: absolute;
    opacity: 0.3;
  }

  .code-blocks-lang {
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 1;
    font-size: 10px;
    color: #ff9e0466;
  }

  .btn-copy {
    opacity: 0;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    background-color: transparent;
    padding: 0;
    margin: 0;
    border: 1px solid #555555;
    background-color: #110e0e;
    border-radius: 4px;
    outline: none;
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .code-blocks:hover .btn-copy {
    opacity: 1;
  }

  .btn-copy svg {
    width: 16px;
  }

  .code-blocks pre {
    position: relative;
    padding: 24px 0;
    overflow-x: auto;
    background-color: #090909 !important;
    --shiki-dark-bg: #090909;
    --shiki-dark: #dbd7caee;
    border-radius: 6px;
    /* background: transparent;
overflow: overlay;
direction: ltr;
text-align: left;
white-space: pre;
word-spacing: normal;
word-break: normal;
word-wrap: normal;
-moz-tab-size: 4;
-o-tab-size: 4;
tab-size: 4;
-webkit-hyphens: none;
-moz-hyphens: none;
-ms-hyphens: none;
hyphens: none; */
  }

  .code-blocks pre>code {
    padding: 0 24px;
    display: block;
  }

  .code-blocks pre .line {
    /* line-height: 1.7; */
    font-size: 14px !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  ul {
    margin: 0 0 16px;
  }

  h1 {
    font-size: 34px;
    line-height: 46px;
  }

  h2 {
    font-size: 26px;
    line-height: 36px;
  }

  h3 {
    font-size: 22px;
    line-height: 30px;
  }

  h4 {
    font-size: 20px;
    line-height: 28px;
  }

  h5 {
    font-size: 18px;
    line-height: 26px;
  }

  h6 {
    font-size: 16px;
    line-height: 24px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
  }

  h1 code,
  h2 code,
  h3 code,
  h4 code,
  h5 code,
  p code,
  ul code {
    background: #343434 !important;
    border-radius: 4px;
    padding: 4px;
  }

  details {
    border-radius: 6px;
    margin-bottom: 16px;
    background-color: #333;
    padding-bottom: 1px;
  }

  summary {
    background-color: #555;
    padding: 10px;
    cursor: pointer;
    outline: none;
    border-radius: 6px;
    user-select: none;
  }

  details[open] summary {
    background-color: #666;
  }

  details>p,
  details>h4 {
    padding: 0 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border: 1px solid #848484;
  }

  table img {
    width: initial;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #848484;
  }

  thead th:not(:last-child),
  tbody td:not(:last-child) {
    border-right: 1px solid #848484;
  }

  th {
    background-color: #232121;
  }

  tr:hover {
    background-color: #232121;
  }

  .heading-anchor {
    position: relative;
  }

  .heading-anchor:hover .anchor {
    opacity: 1;
  }

  .anchor {
    position: absolute;
    padding: 0 5px 0 0;
    left: -20px;
    opacity: 0;
    transition: all 300ms ease-in-out;
  }

  .opacity-0 {
    opacity: 0;
  }

  .markdown-group-tab {
    margin: 0 0 8px;
  }

  .markdown-code-group .code-blocks-group {
    display: none;
  }

  .markdown-code-group .code-blocks-group.active {
    display: block;
  }
</style>

<style>
  main {
    max-width: 890px;
    margin: 0 auto;
    padding: 48px 10px;
  }

  .katex * {
    font-family: initial !important;
  }
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-github-alerts/styles/github-colors-light.css">
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/markdown-it-github-alerts/styles/github-colors-dark-media.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-github-alerts/styles/github-base.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-code-group/styles/code-group-colors-light.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-code-group/styles/code-group-colors-dark-media.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-code-group/styles/code-group-base.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/floating-vue@5.2.2/dist/style.css">

<script type="importmap">
{
  "imports": {
    "@floating-ui/dom": "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.3/+esm",
    "vue": "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.41/vue.esm-browser.prod.js"
  }
}
</script>

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
import { createTooltip, recomputeAllPoppers } from 'https://cdn.jsdelivr.net/npm/floating-vue/dist/floating-vue.mjs';

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
              popperClass: 'v-popper--theme-twoslash v-popper--theme-dropdown twoslash-floating',
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
                'v-popper--theme-twoslash v-popper--theme-dropdown twoslash-floating twoslash-floating-show',
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
              popperClass: 'v-popper--theme-twoslash v-popper--theme-dropdown twoslash-floating',
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
