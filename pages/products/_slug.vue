<template>
  <main id="productsPage">
    <div id="products">
      <ProductBanner :banner="'ocean-treasures'" />
      <ProductsList :products="filteredProducts" />
    </div>
    <div id="productsDetails">
      <ProductSorting />
      <ProductFilters />
    </div>
  </main>
</template>

<script>
// TODO: change url when changing collections...

import { mapGetters } from 'vuex'
import ProductBanner from '~/components/shop/ProductBanner'
import ProductFilters from '~/components/shop/ProductFilters'
import ProductSorting from '~/components/shop/ProductSorting'
import ProductsList from '~/components/shop/ProductsList'

export default {
  components: {
    ProductBanner,
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
      collection: 'shop/collection',
      filteredProducts: 'shop/filteredProducts',
      collectionOptions: 'shop/collectionOptions',
      categoryOptions: 'shop/categoryOptions',
      subcategoryOptions: 'shop/subcategoryOptions'
    })
  },
  created() {
    // TODO: setting subcategory will not also set collection. Can we do nested routes?
    // Nah, just get the first product and also set it's collection & category...
    // TODO: cat and subcat aren't working because those getters filter out based on collection... Need to do a check against all, or do a complete hierarchy mapping...

    const data = {}
    const route = this.$route.params.slug
    if (
      this.collectionOptions.find(option => {
        return option.slug === route
      })
    ) {
      data.collection = route
    } else if (
      this.categoryOptions.find(option => {
        return option.slug === route
      })
    ) {
      data.category = route
    } else if (
      this.subcategoryOptions.find(option => {
        return option.slug === route
      })
    ) {
      data.subcategory = route
    }
    this.$store.dispatch('shop/getProducts', data)
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