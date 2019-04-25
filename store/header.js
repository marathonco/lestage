import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () => ({
  // an array of header objects
  headers: []
})
const getters = {
  headers(state) {
    return state.headers
  }
}

const mutations = {
  // removes new array of headers
  changeHeaders(state, payload) {
    state.headers = payload
  }
}

const actions = {
  changeHeaders({ commit }, payload) {
    commit('changeHeaders', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
