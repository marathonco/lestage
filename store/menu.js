import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () => ({
  menuIsActive: false
})

const getters = {}

const mutations = {
  toggleMenu(state) {
    state.menuIsActive = !state.menuIsActive
  },
  closeMenu(state) {
    state.menuIsActive = false
  }
}

const actions = {
  closeMenu({ commit }) {
    commit('closeMenu')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
