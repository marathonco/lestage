<template>
  <main class="convertibles">
    <header class="brand">
      <Logo />
    </header>
    <ul
      id="products-list"
      class="products-list"
    >
      <li
        v-for="(product, key) of filteredProducts"
        :key="key"
        :data-aos-delay="200*key"
        data-aos="flip-left"
        data-aos-anchor="#products-list"
        data-aos-once="true"
      >
        <nuxt-link
          :to="'/convertible-collection/product/' + product.slug"
          class="link"
        >
          <div class="title">
            {{ product.title }}
          </div>
          <img
            :src="getThumbnail(product.slug, 'convertibles')"
            alt="image thumbnail"
          >
        </nuxt-link>
      </li>
    </ul>
    <nuxt-link
      to="/convertible-collection/"
      class="button rounded bordered primary back-link"
    >View the rest of the collection</nuxt-link>
  </main>
</template>

<script>
// import categories from '~/data/categories-convertible-collection'
import products from '~/data/products-convertible-collection'
import Logo from '~/assets/images/logos/logo-convertible.svg?inline'

export default {
  components: {
    Logo
  },
  validate({ params }) {
    const filteredProducts = products.filter(function(dat) {
      return dat.categorySlug === params.categorySlug
    })
    return filteredProducts.length !== 0
  },
  asyncData({ params }) {
    // pull out the products whose category matches current params
    const filteredProducts = products.filter(function(dat) {
      return dat.categorySlug === params.categorySlug
    })

    // get data from categories.json for correct header images
    // const catData = categories.filter(function(dat) {
    //   return dat.slug === params.categorySlug
    // })
    return { filteredProducts }
  },
  // mounted() {
  //   this.$store.dispatch('header/changeHeaders', this.header)
  // },
  methods: {
    // getThumbnail(image, category) {
    //   return require('~/assets/images/products/' +
    //     category +
    //     '/' +
    //     image +
    //     '.jpg')
    // }
    getThumbnail(image, category) {
      return 'https://via.placeholder.com/200x300'
    }
  },
  head() {
    // TODO: can't figure out how to get dynamic titles here
    return {
      title: 'Convertible Collection',
      meta: [
        {
          vmid: '',
          name: 'Convertible Collection',
          content: 'Convertible Collection'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
