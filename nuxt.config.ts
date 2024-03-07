// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js",
        },
        {
          src: "https://js.stripe.com/v3/",
          async: true,
          defer: true,
        },
      ],
    },
    // pageTransition: {
    //   name: "page",
    //   mode: "out-in",
    // },
    // layoutTransition: {
    //   name: "layout",
    //   mode: "out-in",
    // },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global.scss" as *;',
        },
      },
    },
  },
  css: ["@/assets/scss/base.scss"], //, "@/assets/scss/theme.scss"
  modules: ["@nuxtjs/supabase", "@pinia/nuxt"],

  build: {
    cssSourceMap: false,
    transpile: ["vue-toastification"],
    loaders: {
      scss: {
        sassOptions: {
          quietDeps: true,
        },
      },
    },
  },
  supabase: {
    redirectOptions: {
      exclude: ["/", "/register", "/chat/*", "/join/*/*"],
    },
  },
});
