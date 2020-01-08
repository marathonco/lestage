<template>
  <div id="productList">
    <h3 v-if="filteredProducts.length === 0">
      No Results found matching that criteria
    </h3>
    <ul class="products">
      <Product
        v-for="(product, key) of filteredProducts"
        :key="key"
        :index="key"
        :product="product"
      />
    </ul>
  </div>
</template>

<script>
// TODO: no results found for search.
// TODO: pagination?
import { mapGetters } from 'vuex'
import Product from '~/components/shop/Product'

export default {
  components: {
    Product
  },
  computed: {
    ...mapGetters({
      filteredProducts: 'shop/filteredProducts'
    })
  }
}
</script>

<style lang="scss">
.products {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
</style>
