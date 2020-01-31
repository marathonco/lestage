<template>
  <main id="productsPage">
    <div id="products">
      <ProductsList :products="filteredProducts" />
    </div>
    <div id="productsDetails">
      <ProductSorting
        :hierarchy="hierarchy"
        :groups="groups"
        @changeSearch="changeSearch"
        @changeSorting="changeSorting"
        @changeHierarchy="changeHierarchy"
      />
      <ProductFilters
        :filters="filters"
        @changeFilters="changeFilters"
      />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductFilters from '~/components/shop/ProductFilters'
import ProductSorting from '~/components/shop/ProductSorting'
import ProductsList from '~/components/shop/ProductsList'

// convert price String from "$85-120" into just 85
function convertPriceString(price, direction = 'low') {
  // remove everything after hyphen or before hyphen depending on direction
  if (price.indexOf('-') > 0) {
    direction = direction === 'low' ? 0 : 1
    price = price.split('-')[direction]
  }
  // Remove all non-digits
  return Number(price.replace(/[^0-9.-]+/g, ''))
}

function sortProducts(products, sortMethod) {
  const prods = [...products]
  if (sortMethod === 'sku') {
    prods.sort((a, b) => (a.slug > b.slug ? 1 : -1))
  } else if (sortMethod === 'msrp-low') {
    prods.sort((a, b) => {
      const priceA = convertPriceString(a.price, 'low')
      const priceB = convertPriceString(b.price, 'low')
      if (priceA === priceB) {
        return a.slug > b.slug ? 1 : -1
      } else {
        return priceA > priceB ? 1 : -1
      }
    })
  } else if (sortMethod === 'msrp-high') {
    prods.sort((a, b) => {
      const priceA = convertPriceString(a.price, 'high')
      const priceB = convertPriceString(b.price, 'high')
      if (priceA === priceB) {
      } else {
        return priceA < priceB ? 1 : -1
      }
    })
  } else if (sortMethod === 'collection') {
    prods.sort((a, b) => {
      if (a.collection === b.collection) {
        if (a.category === b.category) {
          if (a.subcategory === b.subcategory) {
            return a.slug > b.slug ? 1 : -1
          } else {
            return a.subcategory > b.subcategory ? 1 : -1
          }
        } else {
          return a.category > b.category ? 1 : -1
        }
      } else {
        return a.collection > b.collection ? 1 : -1
      }
    })
  }
  return prods
}

export default {
  components: {
    ProductFilters,
    ProductSorting,
    ProductsList
  },
  data() {
    return {
      groups: { collection: null, category: null, subcategory: null },
      activeFilters: [],
      sortBy: 'collection',
      searchTerm: null
    }
  },
  computed: {
    ...mapGetters({
      allProducts: 'shop/getProducts',
      hierarchy: 'shop/getHierarchy'
    }),
    filteredProducts() {
      const products = this.allProducts.filter(product => {
        // match collection, category, subcategory
        if (
          (this.groups.collection &&
            this.groups.collection !== product.collectionSlug) ||
          (this.groups.category &&
            this.groups.category !== product.categorySlug) ||
          (this.groups.subcategory &&
            this.groups.subcategory !== product.subcategorySlug)
        ) {
          return false
        }
        // match search
        if (this.searchTerm) {
          const search = new RegExp(this.searchTerm, 'i')
          if (!product.title.match(search)) {
            if (!product.slug.match(search)) {
              if (!product.description.match(search)) {
                return false
              }
            }
          }
        }
        // match filters
        if (this.activeFilters.length > 0) {
          if (product.filters) {
            for (let i = 0; i < this.activeFilters.length; i++) {
              const activeFilter = this.activeFilters[i]
              const check = product.filters.find(productFilter => {
                return (
                  activeFilter.filterType === productFilter.filterType &&
                  activeFilter.filterValue === productFilter.filterValue
                )
              })
              if (!check) {
                // product is missing one or more activeFilter
                return false
              }
            }
          } else {
            return false
          }
        }
        return true
      })
      return sortProducts(products, this.sortBy)
    },
    filters() {
      // create new set of filters
      const productFilters = []
      this.filteredProducts.forEach(product => {
        if (product.filters) {
          product.filters.forEach(productFilter => {
            const match = productFilters.find(filter => {
              return (
                filter.filterType === productFilter.filterType &&
                filter.filterValue === productFilter.filterValue
              )
            })
            if (match) {
              // increase productCount of that filter by 1
              match.productCount += 1
            } else {
              let active = this.activeFilters.find(activeFilter => {
                return (
                  activeFilter.filterType === productFilter.filterType &&
                  activeFilter.filterValue === productFilter.filterValue
                )
              })
              active = active ? 'active' : 'inactive'
              productFilters.push({
                filterType: productFilter.filterType,
                filterValue: productFilter.filterValue,
                filterStatus: active,
                productCount: 1
              })
            }
          })
        }
      })
      return productFilters
    }
  },
  created() {
    // Get Slug to filter collection or categories
    const route = this.$route.params.slug
    // search hierarchy for slug that matches. then reduce down to a single
    if (route) {
      const match = this.hierarchy.find(group => {
        if (group.value === route) {
          return true
        }
      })
      if (match) {
        this.groups[match.type] = match.value
        if (match.parent) {
          const parentMatch = this.hierarchy.find(group => {
            if (group.value === match.parent) {
              return true
            }
          })
          if (parentMatch) {
            this.groups[parentMatch.type] = parentMatch.value
            if (parentMatch.parent) {
              const grandparentMatch = this.hierarchy.find(group => {
                if (group.value === parentMatch.parent) {
                  return true
                }
              })
              if (grandparentMatch) {
                this.groups[grandparentMatch.type] = grandparentMatch.value
              }
            }
          }
        }
      }
    }
  },
  methods: {
    changeSearch(term) {
      this.searchTerm = term
    },
    changeSorting(method) {
      // Change the method of sorting
      this.sortBy = method
      this.filteredProducts = sortProducts(this.filteredProducts, this.sortBy)
    },
    changeFilters(filters) {
      // Change filters
      this.activeFilters = filters
    },
    changeHierarchy(group) {
      // Change collection, category, or subcategory
      this.$router.push({ params: { slug: group } })
    }
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
