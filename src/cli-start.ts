/* eslint-disable @typescript-eslint/no-unused-vars */

import fs from 'node:fs';
import path from 'node:path';

import { readConfig } from 'unreadconfig';

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

const DEFAULT_FILE_NAME = 'mdocs';

const argsToOptions = (args: string[]) => {
  const options = {} as Record<string, string>;
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      options[args[i].slice(2)] = args[i + 1];
    }
  }

  return {
    input: options?.i,
    output: options?.o,

    title: options?.t,
    socialLinks: [
      {
        icon: 'github',
        url: options?.g,
      },
    ],
    isTwoSlash: options?.ts,
  };
};

export async function startCli(cwd = process.cwd(), argv = process.argv) {
  try {
    let optionsConfig: any = argsToOptions(argv);

    if (!optionsConfig?.input) {
      optionsConfig = readConfig(DEFAULT_FILE_NAME);
    }

    if (!optionsConfig || !optionsConfig?.input) {
      colorConsoleText('❌ Error: Not Found Config', 'red');
      return;
    }

    const md = fs.readFileSync(path.resolve(cwd, optionsConfig?.input), 'utf8');

    const content = await markdownToDocs(md, optionsConfig);

    fs.writeFileSync(path.resolve(cwd, optionsConfig?.output), content);

    colorConsoleText(
      `✅ File created successfully: ${path.resolve(cwd, optionsConfig?.output)}`,
      'green',
    );
    console.log();
  } catch (error: any) {
    colorConsoleText('❌ Error: ' + error.message, 'red');
  }
}
