<template>
  <main id="productsPage">
    <div id="products">
      <ProductBanner :groups="groups" />
      <ProductsList :products="filteredProducts" />
    </div>
    <div id="productsDetails">
      <ProductSorting
        :hierarchy="hierarchy"
        :groups="groups"
        :search-term="searchTerm"
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
// TODO: remove all products when making changes, then add them back.
// TODO: don't do page transitions... make it clean.
import { mapGetters } from 'vuex'
import ProductBanner from '~/components/shop/ProductBanner'
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
    ProductBanner,
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
                  // activeFilter.filterType === productFilter.filterType &&
                  activeFilter === productFilter.filterValue
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
                return activeFilter === productFilter.filterValue
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
        this.groups[match.type + 'Label'] = match.label
        if (match.parent) {
          const parentMatch = this.hierarchy.find(group => {
            if (group.value === match.parent) {
              return true
            }
          })
          if (parentMatch) {
            this.groups[parentMatch.type] = parentMatch.value
            this.groups[parentMatch.type + 'Label'] = parentMatch.label
            if (parentMatch.parent) {
              const grandparentMatch = this.hierarchy.find(group => {
                if (group.value === parentMatch.parent) {
                  return true
                }
              })
              if (grandparentMatch) {
                this.groups[grandparentMatch.type] = grandparentMatch.value
                this.groups[grandparentMatch.type + 'Label'] =
                  grandparentMatch.label
              }
            }
          }
        }
      }
    }
    // Check url query_codes for params
    if (this.$route.query.filters) {
      this.activeFilters = JSON.parse(this.$route.query.filters)
    }
    // Check url query_codes for sorting
    if (this.$route.query.sortBy) {
      this.sortBy = this.$route.query.sortBy
    }
    // check url query_codes for search term
    if (this.$route.query.s) {
      this.searchTerm = this.$route.query.s
    }
  },
  methods: {
    changeSearch(term) {
      this.searchTerm = term
      const query = { ...this.$route.query, s: term }
      this.$router.push({ query: query })
    },
    changeSorting(method) {
      // Change the method of sorting
      this.sortBy = method
      const query = { ...this.$route.query, sortBy: method }
      this.$router.push({ query: query })
      // this.filteredProducts = sortProducts(this.filteredProducts, this.sortBy)
    },
    changeFilters(toggleFilter) {
      // Change filters
      let queryFilters = []
      if (toggleFilter !== null) {
        const exists = this.activeFilters.includes(toggleFilter)
        if (exists) {
          queryFilters = this.activeFilters.filter(activeFilter => {
            return activeFilter !== toggleFilter
          })
        } else {
          queryFilters = [...this.activeFilters, toggleFilter]
        }
      }
      this.activeFilters = queryFilters
      const query = {
        ...this.$route.query,
        filters: JSON.stringify(queryFilters)
      }
      this.$router.push({ query: query })
    },
    changeHierarchy(group) {
      // Change collection, category, or subcategory
      if (group.subcategory !== null) {
        group = group.subcategory
      } else if (group.category !== null) {
        group = group.category
      } else if (group.collection !== null) {
        group = group.collection
      } else {
        group = null
      }
      this.$router.push({ params: { slug: group } })
    }
  },
  head() {
    let title = 'LeStage® Collections'
    if (this.$route.params.slug) {
      title = this.groups.collectionLabel
      title += this.groups.categoryLabel
        ? ' | ' + this.groups.categoryLabel
        : ''
      title += this.groups.subcategoryLabel
        ? ' | ' + this.groups.subcategoryLabel
        : ''
    }

    return {
      // TODO: get long name from slug
      title: title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Authentic Jewelry in Sterling Silver and 14K Gold.'
        }
      ]
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
