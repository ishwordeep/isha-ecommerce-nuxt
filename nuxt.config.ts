// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devServer: {
    port: 6002,
  },

  ssr: true,
  srcDir: 'app',
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: '',
      appUrl: '',
    },
  },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/fonts', '@pinia/nuxt'],
  ui: {
    colorMode: false,
    theme: {
      defaultVariants: {
        color: 'primary',
      },
    },
  },
  image: {
    dir: 'assets/images',
  },
  css: ['~/assets/css/main.css', '~/assets/css/rawHtml.css'],
  vite: {
    css: {
      devSourcemap: false,
    },
    plugins: [tailwindcss()],
  },
})
