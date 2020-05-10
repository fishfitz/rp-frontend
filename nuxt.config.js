require('dotenv').config();

export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: ['~/assets/css/main.scss'],
  plugins: [
    '~/plugins/axios',
    '~/plugins/getJwt',
    '~/plugins/getUser',
    { src: '~/plugins/vuex-persist', ssr: false }
  ],
  modules: [
    ['nuxt-buefy', {
      defaultToastPosition: 'is-bottom-right',
      defaultFieldLabelPosition: 'on-border'
    }],
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  axios: {
    proxy: true,
    prefix: '/api'
  },
  proxy: { '/api': { target: process.env.API_URL, pathRewrite: { '^/api/': '' } } },
  serverMiddleware: [
    require('cookie-parser')()
  ],
  build: {
    extractCSS: true,
    postcss: { plugins: { 'postcss-custom-properties': false } }
  }
};
