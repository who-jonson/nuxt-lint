import type { Options as ESLintViteOptions } from 'vite-plugin-eslint';
import type { Options as ESLintWebpackOptions } from 'eslint-webpack-plugin';
import type { Options as StylelintWebpackOptions } from 'stylelint-webpack-plugin';
import type { StylelintPluginOptions as StylelintViteOptions } from 'vite-plugin-stylelint';

type Arrayable<T> = T | Array<T>;

interface CommonLintOptions {
  /**
   * File extensions to lint
   */
  extensions?: Array<string>;

  /**
   * File(s) to exclude
   */
  exclude?: Arrayable<string | RegExp>;

  /**
   * File(s) to include
   */
  include?: Arrayable<string | RegExp>;

  /**
   * Fix files
   */
  fix?: boolean;
}

export interface NuxtLintModuleOptions {
  /**
   * Disable NuxtLint Module
   *
   * @default `true` on Production
   */
  disable?: true;

  /**
   * Enable build-time lint.
   * By default, it will run linter in development.
   *
   * @default `false`
   */
  buildMode?: boolean;

  /**
   * Configure or Disable Eslint
   */
  eslint?: boolean | Partial<(CommonLintOptions & ESLintViteOptions & ESLintWebpackOptions)> | undefined;

  /**
   * Configure or Disable Stylelint
   */
  stylelint?: boolean | Partial<(CommonLintOptions & StylelintViteOptions & StylelintWebpackOptions)> | undefined;
}
