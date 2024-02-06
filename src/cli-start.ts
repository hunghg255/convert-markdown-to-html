/* eslint-disable @typescript-eslint/no-unused-vars */

import fs from 'node:fs';
import path from 'node:path';

import { markdownToDocs } from '.';

const COLORS = {
  black: '\u001B[30m',
  red: '\u001B[31m',
  green: '\u001B[32m',
  yellow: '\u001B[33m',
  blue: '\u001B[34m',
  magenta: '\u001B[35m',
  cyan: '\u001B[36m',
  white: '\u001B[37m',
  console_color: '\u001B[0m',
} as const;

const colorConsoleText = (text: string, color: keyof typeof COLORS) => {
  const coloredText = `${COLORS[color]}${text}${COLORS.console_color}`;
  return console.log(coloredText);
};

const DEFAULT_FILE_NAME = 'markdown-to-html.html';

export async function startCli(cwd = process.cwd(), argv = process.argv) {
  try {
    const [node, script, ...args] = argv;

    const input = path.resolve(cwd, args[1]);
    const output = args[3] || DEFAULT_FILE_NAME;
    const title = args[5] || 'Markdown to HTML';
    const githubCornor = args[7] || 'Markdown to HTML';

    const md = fs.readFileSync(input, 'utf8');

    const content = await markdownToDocs(md, title, githubCornor);

    fs.writeFileSync(path.resolve(cwd, output), content);

    colorConsoleText(`✅ File created successfully: ${path.resolve(cwd, output)}`, 'green');
  } catch (error: any) {
    colorConsoleText('❌ Error: ' + error.message, 'red');
  }
}
