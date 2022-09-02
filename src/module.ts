import { resolve } from 'path';
import { isObject, toArray } from '@whoj/utils-core';
import { checkPackageStatus } from '@whoj/manage-pkg';
import {
  addVitePlugin,
  addWebpackPlugin,
  createResolver,
  defineNuxtModule,
  useLogger
} from '@nuxt/kit';
import ESLintVitePlugin from 'vite-plugin-eslint';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import StylelintVitePlugin from 'vite-plugin-stylelint';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import { name, version } from '../package.json';
import type { NuxtLintModuleOptions } from './options';

const logger = useLogger('@whoj:nuxt-lint');

export default defineNuxtModule<NuxtLintModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'lint',
    compatibility: {
      nuxt: '>=3.0.0-rc.8'
    }
  },
  defaults: {
    buildMode: false,
    eslint: {
      fix: true,
      include: [
        '{**/*,*}.{js,jsx,ts,tsx,vue}'
      ]
    },
    stylelint: {
      fix: true,
      include: [
        '{**/*,*}..{s?(a|c)ss,less,stylus}'
      ]
    }
  },
  async setup(options, nuxt) {
    if (!options.disable) {
      const { resolve: resolveRuntime } = createResolver(import.meta.url);

      const pluginAddOptions = {
        build: options.buildMode,
        dev: !options.buildMode
      };
      const filesToWatch: string[] = [];

      // Add Eslint Plugin
      if (isObject(options.eslint)) {
        if (!(await checkPackageStatus('eslint'))) {
          logger.warn('The dependency `eslint` not found.', 'Please run `pnpm add -D eslint` or `npm install eslint --save-dev`');
          return;
        }

        filesToWatch.push(
          '.eslintrc',
          '.eslintrc.json',
          '.eslintrc.yaml',
          '.eslintrc.yml',
          '.eslintrc.js'
        );

        addVitePlugin(ESLintVitePlugin(options.eslint), pluginAddOptions);
        addWebpackPlugin(new ESLintWebpackPlugin(options.eslint), pluginAddOptions);
      }

      // Add Stylelint Plugin
      if (isObject(options.stylelint)) {
        if (!(await checkPackageStatus('stylelint'))) {
          logger.warn('The dependency `stylelint` not found.', 'Please run `pnpm add -D stylelint` or `npm install stylelint --save-dev`');
          return;
        }
        filesToWatch.push(
          '.stylelintignore',
          '.stylelintrc',
          '.stylelintrc.json',
          '.stylelintrc.yaml',
          '.stylelintrc.yml',
          '.stylelintrc.js',
          'stylelint.config.js'
        );

        addVitePlugin(StylelintVitePlugin(options.stylelint), pluginAddOptions);
        addWebpackPlugin(new StylelintWebpackPlugin(options.stylelint), pluginAddOptions);
      }

      nuxt.options.watch.push(
        ...filesToWatch.map(file => resolve(nuxt.options.rootDir, file))
      );
    }
  }
});

export type { NuxtLintModuleOptions };
