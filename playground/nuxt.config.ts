import { defineNuxtConfig } from 'nuxt'
import WhojModule from '..'

export default defineNuxtConfig({
  modules: [
    WhojModule
  ],
  whojModule: {
    addPlugin: true
  }
})
