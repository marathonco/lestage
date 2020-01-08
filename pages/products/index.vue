<template>
  <main id="productsPage">
    <div id="products">
      <header class="brand">
        <LogoCapeCod v-if="collection === 'cape-cod'" />
        <LogoConvertibles v-if="collection === 'convertible-collection'" />
      </header>
      <ProductsList />
    </div>
    <div id="productsDetails">
      <ProductSorting />
      <ProductFilters />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import LogoCapeCod from '~/assets/images/logos/logo-cape-cod.svg?inline'
import LogoConvertibles from '~/assets/images/logos/logo-convertible.svg?inline'
import ProductFilters from '~/components/shop/ProductFilters'
import ProductSorting from '~/components/shop/ProductSorting'
import ProductsList from '~/components/shop/ProductsList'

export default {
  components: {
    LogoCapeCod,
    LogoConvertibles,
    ProductFilters,
    ProductSorting,
    ProductsList
  },
  head() {
    // TODO: can't figure out how to get dynamic titles here
    return {
      title: 'Products',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      collection: 'shop/collection'
    })
  },
  mounted() {
    this.$store.dispatch('shop/getProducts')
  }
}
</script>

<style lang="scss">
#productsPage {
  display: flex;
}
#productDetails {
  align-self: flex-end;
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-shrink: 0;
  width: 250px;
}
#products {
  flex-grow: 6;
}
</style>
