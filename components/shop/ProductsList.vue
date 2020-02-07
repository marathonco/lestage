<template>
  <div class="productList">
    <h3 v-if="products.length === 0">
      No Results found matching that criteria
    </h3>
    <transition-group name="fade" :duration="10000" tag="ul" class="products">
      <Product
        v-for="(product, key) of paginatedProducts"
        :key="key"
        :index="key"
        :product="product"
      />
    </transition-group>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @pageChange="onPageChange"
    />
  </div>
</template>

<script>
import Pagination from '~/components/core/Pagination'
import Product from '~/components/shop/Product'

export default {
  components: {
    Pagination,
    Product
  },
  props: {
    products: {
      type: Array,
      default: null,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      productsPerPage: 40
    }
  },
  computed: {
    paginatedProducts() {
      return this.products.slice(
        (this.currentPage - 1) * this.productsPerPage,
        this.currentPage * this.productsPerPage
      )
    },
    totalPages() {
      return Math.ceil(this.products.length / this.productsPerPage)
    }
  },
  watch: {
    products() {
      this.currentPage = 1
    }
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page
    }
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 10s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
