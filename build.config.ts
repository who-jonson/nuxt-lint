import { promises as fs, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  declaration: true,
  outDir: 'dist',
  rollup: {
    esbuild: {
      treeShaking: true
    }
  },
  hooks: {
    async 'build:before'({ options }) {
      options.entries = options.entries.filter(e => e.builder === 'rollup');
      options.externals.push('scule', 'serialize-javascript');
    },
    async 'rollup:done'() {
      const filePath = resolve(fileURLToPath(new URL('./', import.meta.url)), 'dist/types.d.ts');
      if (existsSync(filePath)) {
        const types = [
          `export type { Options as ESLintViteOptions } from 'vite-plugin-eslint';`,
          `export type { Options as ESLintWebpackOptions } from 'eslint-webpack-plugin';`,
          `export type { Options as StylelintWebpackOptions } from 'stylelint-webpack-plugin';`,
          `export type { StylelintPluginOptions as StylelintViteOptions } from 'vite-plugin-stylelint';`,
          '',
          `export { NuxtLintModuleOptions, default } from './module'`
        ].join('\n');

        await fs.writeFile(filePath, types, 'utf8');
      }
    }
  }
});
