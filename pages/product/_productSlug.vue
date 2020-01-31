<template>
  <main>
    <header class="brand">
      <Logo :collection="product.collection" />
    </header>
    <section id="product">
      <div class="info">
        <h3>
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
          :src="thumbnail"
          alt="main product image"
        >
      </div>
    </section>
    <aside
      v-if="similarProducts.length > 0"
      class="other"
    >
      <h4>Other Styles:</h4>
      <ProductsList :products="similarProducts" />
    </aside>
    <nuxt-link
      :to="'products/' + product.collectionSlug"
      class="button rounded bordered primary back-link"
    >
      View the rest of the collection
    </nuxt-link>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductsList from '~/components/shop/ProductsList'
import Logo from '~/components/core/Logo'

export default {
  name: 'Products',
  components: {
    Logo,
    ProductsList
  },
  computed: {
    ...mapGetters({
      allProducts: 'shop/getProducts'
    }),
    similarProducts() {
      const similarProducts = this.allProducts.filter(dat => {
        if (this.product.slug === dat.slug) {
          return false
        } else if (this.product.subcategorySlug) {
          if (this.product.subcategorySlug === dat.subcategorySlug) {
            return true
          }
        } else if (this.product.categorySlug) {
          if (this.product.categorySlug === dat.categorySlug) {
            return true
          }
        }
      })
      return similarProducts
    },
    thumbnail() {
      return (
        'https://marathon-co.com/media/lestage/' +
        this.product.collectionSlug +
        '/' +
        this.product.slug +
        '.jpg'
      )
    }
  },
  asyncData({ params, store }) {
    const product = store.state.shop.allProducts.find(
      product => product.slug === params.productSlug
    )
    return { product }
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

<style lang="scss" scoped>
#product {
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
  #product {
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
