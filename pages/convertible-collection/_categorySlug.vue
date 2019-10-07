<template>
  <main>
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
            :src="getThumbnail(product.slug)"
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
import Logo from '~/assets/logo-convertible.svg?inline'

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
    getThumbnail(thumbnail) {
      return 'https://via.placeholder.com/200x300'
      // return require('~/assets/images/products/' + thumbnail + '.jpg')
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
.products-list {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  li {
    background: #ffffff;
    height: 140px;
    margin: 10px;
    position: relative;
    width: 140px;
    .link {
      display: block;
      height: 140px;
      overflow: hidden;
      position: relative;
      width: 140px;
    }
    &::after {
      // box-shadow
      box-shadow: 0px 15px 15px -15px rgba(0, 0, 0, 0.5);
      content: '';
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      transition: opacity $transition-duration ease-in-out;
      width: 100%;
      z-index: -1;
    }
    img {
      background: #ffffff;
    }
    .title {
      align-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0);
      bottom: -100%;
      display: flex;
      justify-content: center;
      padding: 1rem;
      position: absolute;
      transition: bottom $transition-duration ease-in-out,
        background $transition-duration ease-in-out;
      width: 100%;
      z-index: 50px;
    }
  }
  li:hover {
    &::after {
      // box-shadow
      opacity: 1;
    }
    .title {
      background: rgba(0, 0, 0, 0.25);
      bottom: 0;
    }
  }
}
</style>
