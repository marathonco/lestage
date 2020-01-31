import Vue from 'vue'
import Vuex from 'vuex'
import productData from '@/data/products'

Vue.use(Vuex)

let productHierarchy = []

productData.forEach(product => {
  productHierarchy.push({
    label: product.collection,
    value: product.collectionSlug,
    type: 'collection'
  })
  productHierarchy.push({
    label: product.category,
    value: product.categorySlug,
    parent: product.collectionSlug,
    type: 'category'
  })
  productHierarchy.push({
    label: product.subcategory,
    value: product.subcategorySlug,
    parent: product.categorySlug,
    type: 'subcategory'
  })
})

productHierarchy = Array.from(new Set(productHierarchy.map(JSON.stringify))).map(JSON.parse)

const state = () => ({
  allProducts: productData,
  // hierarchy: Array.from(new Set(productHierarchy.map(JSON.stringify))).map(JSON.parse)
  hierarchy: productHierarchy
})

const getters = {
  getProducts(state) {
    // return all products
    return state.allProducts
  },
  getSearchProducts: (state) => (slug) => {
    // search specific fields for a slug
    const search = new RegExp(slug, 'i')
    const products = state.allProducts.filter(product => {
      if (product.title.match(search)) {
        return true
      } else if (product.slug.match(search)) {
        return true
      } else if (product.description.match(search)) {
        return true
      }
    })
    return products
  },
  getProduct: (state) => (slug) => {
    // return a specific product with the sku/slug
    return state.allProducts.find(product => product.slug === slug)
  },
  getHierarchy(state) {
    return state.hierarchy
  }
}
const mutations = {}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
