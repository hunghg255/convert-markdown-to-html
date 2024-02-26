import fs from 'node:fs/promises';
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index', 'src/cli'],
  clean: true,
  declaration: true,

  rollup: {
    emitCJS: true,
    cjsBridge: true,
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
  hooks: {
    'rollup:done': async () => {
      // eslint-disable-next-line no-console
      const local = await fs.readFile(new URL('./src/style.css', import.meta.url), 'utf-8');

      await fs.writeFile(new URL('./dist/style.css', import.meta.url), local);
    },
  },
  failOnWarn: false,
});
