import Vue from 'vue'
import Vuex from 'vuex'
import productData from '@/data/products'

Vue.use(Vuex)

// TODO: organize filter options with active options in front of array

function sortProducts(products, sorting) {
  const prod = [...products]
  if (sorting === 'sku') {
    prod.sort((a, b) => (a.slug > b.slug) ? 1 : -1)
  } else if (sorting === 'msrp') {
    prod.sort((a, b) => (a.price < b.price) ? 1 : -1)
  } else if (sorting === 'collection') {
    // TODO: also sort by subcategory... Tricky...
    prod.sort((a, b) => (a.category > b.category) ? 1 : -1)
  }
  return prod
}

const collectionOptions = []
const categoryOptions = []
const subcategoryOptions = []

productData.forEach(product => {
  let match = collectionOptions.find(option => {
    return option.slug === product.collectionSlug && option.label === product.collection
  })
  if (!match) {
    collectionOptions.push({
      slug: product.collectionSlug,
      label: product.collection

    })
  }
  if (product.category) {
    match = categoryOptions.find(option => {
      return option.slug === product.categorySlug && option.label === product.category
    })
    if (!match) {
      categoryOptions.push({
        slug: product.categorySlug,
        label: product.category,
        collection: product.collectionSlug
      })
    }
  }
  if (product.subcategory) {
    match = subcategoryOptions.find(option => {
      return option.slug === product.subcategorySlug && option.label === product.subcategory
    })
    if (!match) {
      subcategoryOptions.push({
        slug: product.subcategorySlug,
        label: product.subcategory,
        collection: product.collectionSlug,
        category: product.categorySlug
      })
    }
  }
})

// const hierarchy = []
// productData.forEach(product => {

//   let match = collectionOptions.find(option => {
//     return option.slug === product.collectionSlug && option.label === product.collection
//   })
//   if (!match) {
//     collectionOptions.push({
//       slug: product.collectionSlug,
//       label: product.collection

//     })
//   }
//   if (product.category) {
//     match = categoryOptions.find(option => {
//       return option.slug === product.categorySlug && option.label === product.category
//     })
//     if (!match) {
//       categoryOptions.push({
//         slug: product.categorySlug,
//         label: product.category,
//         collection: product.collectionSlug
//       })
//     }
//   }
//   if (product.subcategory) {
//     match = subcategoryOptions.find(option => {
//       return option.slug === product.subcategorySlug && option.label === product.subcategory
//     })
//     if (!match) {
//       subcategoryOptions.push({
//         slug: product.subcategorySlug,
//         label: product.subcategory,
//         collection: product.collectionSlug,
//         category: product.categorySlug
//       })
//     }
//   }
// })

const state = () => ({
  activeFilters: [],
  possibleFilters: [],
  filters: [],
  collection: null,
  category: null,
  sorting: 'collection',
  allProducts: productData,
  possibleProducts: productData,
  filteredProducts: productData
})

const getters = {
  sorting(state) {
    return state.sorting
  },
  collection(state) {
    return state.collection
  },
  collectionOptions(state) {
    // should be in the form {slug: 'convertibles', label: 'Lestage® Convertibles'}
    return collectionOptions
  },
  category(state) {
    return state.category
  },
  categoryOptions(state) {
    // should be in the form {slug: 'clasp-ocean-treasures', label: 'Ocean Treasures'}
    // filter out categories not in current collection
    const options = categoryOptions.filter(option => {
      return option.collection === state.collection
    })
    return options
  },
  subcategory(state) {
    return state.subcategory
  },
  subcategoryOptions(state) {
    // should be in the form {slug: 'beach-clasps', label: 'Beach Clasps'}
    // filter out categories not in current collection
    const options = subcategoryOptions.filter(option => {
      return option.category === state.category && option.collection === state.collection
    })
    return options
  },
  filters(state) {
    // Available filters and states based on current collection and/or category
    // activeFilters will be set to "active"
    // filters not present in filteredProducts will be set to "disabled"
    return state.filters
  },
  activeFilters(state) {
    // an array of all activeFilters
    return state.activeFilters
  },
  products(state) {
    // all products
    return state.allProducts
  },
  filteredProducts(state) {
    // Available products based on current collection, category, and activeFilters
    // Use sorting to determine order of products
    return state.filteredProducts
  }
}

const mutations = {
  UPDATE_POSSIBLE_PRODUCTS(state, payload) {
    // receives products, collection, category, sorting
    // set possibleFilters, activeFilters, possibleProducts and filteredProducts
    if (payload.collection !== undefined) {
      state.collection = payload.collection
    }
    if (payload.category !== undefined) {
      state.category = payload.category
    }
    const filters = []
    const products = []
    // Run through allProducts and get matching collection/category,
    payload.products.forEach(product => {
      let include = true
      if (state.collection) {
        if (product.collectionSlug !== state.collection) {
          include = false
        }
      }
      if (state.category) {
        if (product.categorySlug !== state.category) {
          include = false
        }
      }
      if (state.subcategory) {
        if (product.subcategorySlug !== state.subcategory) {
          include = false
        }
      }
      if (include) {
        // add product to new array
        products.push(product)
        // add unique filter values to filters
        if (product.filters) {
          product.filters.forEach(productFilter => {
            const match = filters.find(filter => {
              return (
                filter.filterType === productFilter.filterType &&
                filter.filterValue === productFilter.filterValue
              )
            })
            if (match) {
              // increase productCount of that value by 1
              match.productCount += 1
            } else {
              filters.push({
                filterType: productFilter.filterType,
                filterValue: productFilter.filterValue,
                filterStatus: 'inactive',
                productCount: 1
              })
            }
          })
        }
      }
    })
    state.filteredProducts = state.possibleProducts = sortProducts(products, state.sorting)
    state.possibleFilters = state.filters = filters
  },
  UPDATE_FILTERED_PRODUCTS(state, payload) {
    // receives products, activeFilters, sorting
    // set possibleFilters, filteredProducts, and activeFilters
    state.activeFilters = payload.activeFilters
    const filters = []
    // if there are no active filters, reset back to possibleFilters and possibleProducts
    if (payload.activeFilters.length === 0) {
      state.filteredProducts = [...state.possibleProducts]
      state.filters = [...state.possibleFilters]
    } else {
      const filteredProducts = payload.products.filter(product => {
        // if the product has no filters exclude it
        if (!product.filters) {
          return false
        } else {
          for (let i = 0; i < payload.activeFilters.length; i++) {
            const activeFilter = payload.activeFilters[i]
            const check = product.filters.find(productFilter => {
              return (activeFilter.filterType === productFilter.filterType && activeFilter.filterValue === productFilter.filterValue)
            })
            if (!check) {
              // didn't pass on a filter so go ahead and return false
              return false
            }
          }
        }
        // haven't returned false yet, so proceed.
        // check to see if filterValue has already been added, and increment productCount
        product.filters.forEach(productFilter => {
          const match = filters.find(filter => {
            return (
              filter.filterType === productFilter.filterType &&
              filter.filterValue === productFilter.filterValue
            )
          })
          if (match) {
            match.productCount += 1
          } else {
            // check activeFilters for status
            const active = payload.activeFilters.find(filter => {
              return (
                filter.filterType === productFilter.filterType &&
                filter.filterValue === productFilter.filterValue
              )
            })
            const status = active ? 'active' : 'inactive'
            filters.push({
              filterType: productFilter.filterType,
              filterValue: productFilter.filterValue,
              filterStatus: status,
              productCount: 1
            })
          }
        })
        return true
      })
      state.filteredProducts = sortProducts(filteredProducts, state.sorting)
      state.filters = filters
    }
  },
  UPDATE_SORTING(state, payload) {
    // receives products and sorting
    // reorders products based on sorting method and saves to filteredProducts
    state.sorting = payload.sorting
    state.filteredProducts = sortProducts(payload.products, payload.sorting)
  }
}

const actions = {
  getProducts({
    commit,
    state
  }, payload) {
    commit('UPDATE_POSSIBLE_PRODUCTS', {
      ...payload,
      products: state.allProducts
    })
  },
  searchProducts({
    commit,
    state
  }, payload) {
    // TODO: decide if we want to clear filters and collections and categories
    const products = state.allProducts.filter(product => {
      // check product attributes for payload
      const search = new RegExp(payload, 'i')
      if (product.title.match(search)) {
        return true
      } else if (product.slug.match(search)) {
        return true
      } else if (product.description.match(search)) {
        return true
      }
      // else if (product.properties) {
      //   product.properties.forEach(property => {
      //     if (property.value.match(search)) {
      //       return true
      //     }
      //   })
      // }
    })
    commit('UPDATE_POSSIBLE_PRODUCTS', {
      products: products
    })
  },
  // TODO: should we condense this all into one call? just use getProducts and pass payload.collection or payload.category etc.?
  // TODO: we can also reduce all hierarchy into one tree and do a search?

  changeCollection({
    commit,
    state
  }, payload) {
    const data = {
      products: state.allProducts,
      collection: payload,
      category: null,
      subcategory: null
    }
    commit('UPDATE_POSSIBLE_PRODUCTS', data)
  },
  changeCategory({
    commit,
    state
  }, payload) {
    // TODO: update url ?
    const data = {
      products: state.allProducts,
      category: payload,
      subcategory: null
    }
    commit('UPDATE_POSSIBLE_PRODUCTS', data)
  },
  changeSubcategory({
    commit,
    state
  }, payload) {
    const data = {
      products: state.allProducts,
      subcategory: payload
    }
    commit('UPDATE_POSSIBLE_PRODUCTS', data)
  },
  changeSorting({
    commit,
    state
  }, payload) {
    const data = {
      products: state.filteredProducts,
      sorting: payload
    }
    commit('UPDATE_SORTING', data)
  },
  addFilter({
    commit,
    state
  }, payload) {
    const activeFilters = [...state.activeFilters, payload]
    const data = {
      products: state.filteredProducts,
      activeFilters: activeFilters
    }
    commit('UPDATE_FILTERED_PRODUCTS', data)
  },
  removeFilter({
    commit,
    state
  }, payload) {
    const activeFilters = state.activeFilters.filter(activeFilter => {
      return activeFilter.filterType !== payload.filterType ||
        activeFilter.filterValue !== payload.filterValue
    })
    const data = {
      products: state.possibleProducts,
      activeFilters: activeFilters
    }
    commit('UPDATE_FILTERED_PRODUCTS', data)
  },
  clearFilters({
    commit
  }) {
    commit('UPDATE_FILTERED_PRODUCTS', {
      products: state.possibleProducts,
      activeFilters: []
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
