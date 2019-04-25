<template>
  <main>
    <header class="brand">
      <Logo />
    </header>
    <ul
      v-if="featuredProducts.length > 0"
      id="featured-list"
      class="featured-list"
    >
      <li
        v-for="(product, key) of featuredProducts"
        :key="key"
        :data-aos-delay="200*key"
        data-aos="flip-down"
        data-aos-once="true"
      >
        <nuxt-link
          :to="'/product/' + product.slug"
          class="link"
        >
          <img
            :src="getThumbnail(product.slug)"
            alt="image thumbnail"
          >
          <div class="center">
            <h4 class="title">
              {{ product.title }}
            </h4>
            <div class="description">
              {{ product.description }}
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
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
          :to="'/product/' + product.slug"
          class="link"
        >
          <div class="title">
            {{ product.title }}
          </div>
          <img
            :src="getThumbnail(product.slug)"
            alt="image thumbnail"
          >
        </nuxt-link>
      </li>
    </ul>
    <nuxt-link
      to="/products"
      class="button rounded bordered primary back-link"
    >View the rest of the collection</nuxt-link>
    <Warranty />
  </main>
</template>

<script>
import categories from '~/data/categories'
import products from '~/data/products'
import Logo from '~/assets/logo-cape-cod.svg?inline'
import Warranty from '~/components/partials/Warranty'

export default {
  components: {
    Logo,
    Warranty
  },
  validate({ params }) {
    const filteredProducts = products.filter(function(dat) {
      return dat.categorySlug === params.categorySlug
    })
    return filteredProducts.length !== 0
  },
  asyncData({ params }) {
    // pull out the products whose category matches current params and is featured
    const featuredProducts = products.filter(function(dat) {
      return dat.categorySlug === params.categorySlug && dat.featured === true
    })

    // pull out the products whose category matches current params
    const filteredProducts = products.filter(function(dat) {
      return dat.categorySlug === params.categorySlug && dat.featured !== true
    })

    // get data from categories.json for correct header images
    const catData = categories.filter(function(dat) {
      return dat.slug === params.categorySlug
    })
    const header = []
    catData[0].headers.forEach(element => {
      header.push({ image: element })
    })
    return { featuredProducts, filteredProducts, header }
  },
  mounted() {
    this.$store.dispatch('header/changeHeaders', this.header)
  },
  methods: {
    getThumbnail(thumbnail) {
      return require('~/assets/images/products/' + thumbnail + '.jpg')
    }
  },
  head() {
    // TODO: can't figure out how to get dynamic titles here
    return {
      title: 'Cape Cod Jewelry',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Authentic Cape Cod Jewelry in Sterling Silver and 14K Gold.'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#featured-list li {
  $featured-height-large: 400px;
  a {
    align-items: center;
    background: #fff;
    display: flex;
    min-height: 140px;
    margin: 1rem;
    @include tablet {
      min-height: $featured-height-large;
      margin: 1rem;
    }
    .title {
      @include line-after;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
    }
    .center {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
    }
    img {
      height: 140px;
      width: 140px;
      @include tablet {
        height: $featured-height-large;
        width: $featured-height-large;
      }
    }
  }
}
</style>
