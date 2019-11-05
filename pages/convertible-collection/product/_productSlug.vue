<template>
  <main class="convertibles">
    <header class="brand">
      <Logo />
    </header>
    <section class="product">
      <div class="info">
        <h3>
          Convertible Collection
          <br>
          {{ product.title }}
        </h3>
        <h6 class="msrp">
          MSRP: {{ product.price }}
        </h6>
        <p class="description">
          {{ product.description }}
        </p>
        <div
          v-for="(property, key) of product.properties"
          :key="key"
          class="property"
        >
          <h6>{{ property.name }}</h6>
          <p>{{ property.value }}</p>
        </div>
        <nuxt-link
          to="/retailers"
          class="button rounded primary bordered"
        >
          Find a retailer
        </nuxt-link>
        <nuxt-link
          to="/warranty"
          class="button rounded primary bordered"
        >
          Product Care
        </nuxt-link>
      </div>
      <div class="images">
        <img
          :src="getThumbnail(product.slug, 'convertibles')"
          alt="main product image"
        >
      </div>
    </section>
    <aside class="other">
      <h4>Other Styles:</h4>
      <ul
        id="products-list"
        class="products-list"
      >
        <li
          v-for="(crossProduct, key) of filteredProducts"
          :key="key"
          :data-aos-delay="200 * key"
          data-aos="flip-left"
          data-aos-anchor="#productsList"
          data-aos-once="true"
        >
          <nuxt-link
            :to="'/product/' + crossProduct.slug"
            class="link"
          >
            <div class="title">
              {{ crossProduct.title }}
            </div>

            <img
              :src="getThumbnail(crossProduct.slug)"
              alt="image thumbnail"
            >
          </nuxt-link>
        </li>
      </ul>
    </aside>
    <nuxt-link
      to="/convertible-collection/products"
      class="button rounded bordered primary back-link"
    >
      View the rest of the collection
    </nuxt-link>
  </main>
</template>

<script>
import products from '~/data/products-convertible-collection'
import Logo from '~/assets/images/logos/logo-convertible.svg?inline'

export default {
  name: 'Products',
  components: {
    Logo
  },
  validate({ params }) {
    const product = products.filter(function(dat) {
      return dat.slug === params.productSlug
    })
    return product.length !== 0
  },
  asyncData({ params }) {
    const product = products.filter(function(dat) {
      return dat.slug === params.productSlug
    })[0]
    const filteredProducts = products.filter(function(dat) {
      // skip current product
      if (dat.slug === params.productSlug) {
        return false
      }
      return dat.categorySlug === product.categorySlug
    })

    return { product, filteredProducts }
  },
  methods: {
    // getThumbnail(image, category) {
    //   return require('~/assets/images/products/' +
    //     category +
    //     '/' +
    //     image +
    //     '.jpg')
    // }
    getThumbnail(image, category) {
      return 'https://via.placeholder.com/300x300'
      // return require('~/assets/images/products/convertibles/' + thumbnail + '.jpg')
    }
  },
  head() {
    // TODO: can't figure out how to get dynamic titles here
    return {
      title: 'The Convertible Collection',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Authentic Jewelry in Sterling Silver and 14K Gold.'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.product {
  background: #ffffff;
  .info,
  .images {
    padding: 1rem;
    width: 100%;
  }

  h6 {
    @include font-accent;
    color: getColor(text, accent);
    text-transform: uppercase;
  }
  .button {
    display: inline-block;
    margin: 10px;
    width: 140px;
  }
  .msrp {
    @include line-after;
    margin-bottom: 1rem;
    padding: 1rem;
  }
}
@include tablet {
  .product {
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    .info {
      padding: 2rem;
      width: 40vw;
    }
    .images {
      padding: 2rem;
      width: 60vw;
    }
    .button {
      display: block;
      width: 100%;
    }
  }
}
</style>
