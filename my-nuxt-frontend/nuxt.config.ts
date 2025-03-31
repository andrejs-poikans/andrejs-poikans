// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,        // Disable SSR (Server-Side Rendering) for GitHub Pages
  css: [
    '@/css/style.css', // Path to the CSS file you just created
  ],
})