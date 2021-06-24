import products from './data/products'

const dynamicRoutes = () => {
  return new Promise(resolve => {
    const productRoutes = products.map(el => `product/${el.slug}`)
    const collectionRoutes = products.map(el => `products/${el.collectionSlug}`)
    const categoryRoutes = products.map(el => `products/${el.categorySlug}`)
    const subcategoryRoutes = products.map(el => `products/${el.subcategorySlug}`)
    resolve(['products/', ...new Set(collectionRoutes), ...new Set(categoryRoutes), ...new Set(subcategoryRoutes), ...productRoutes])
  })
}

const pkg = require('./package')

export default {
  target: 'static',
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
  plugins: [
    { src: '~plugins/vee-validate.js' },
    {
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
      'nuxt-lazy-load',
      {
        // These are the default values
        images: true,
        videos: true,
        audios: true,
        iframes: true,
        directiveOnly: false
      }
    ],
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
   ** Generate Dynamic Routes
   */
  generate: {
    routes: dynamicRoutes
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    extend (config, ctx) {
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
