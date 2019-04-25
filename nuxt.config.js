const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge,chrome=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: pkg.description
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
    src: '~/plugins/aos',
    mode: 'client'
  },
  {
    src: '~plugins/vee-validate.js'
  }, {
    src: '~/plugins/swiper.js',
    ssr: false
  }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-svg',
    [
      'nuxt-fontawesome',
      {
        component: 'icon',
        imports: [{
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faTwitter', 'faInstagram', 'faFacebook']
        }]
      }
    ]
  ],

  /*
   ** Global Resources
   */
  styleResources: {
    scss: ['~/assets/style/main.scss']
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
