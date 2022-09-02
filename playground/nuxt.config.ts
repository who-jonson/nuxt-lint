import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  modules: [
    './../src/module'
  ],
  lint: {
    buildMode: true
  }
});
