import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () => ({
  embedded: false
})

const getters = {}

const mutations = {
  SET_EMBEDDED(state) {
    state.embedded = true
  }
}

const actions = {
  setEmbedded({ commit }) {
    commit('SET_EMBEDDED')
  },
  postResize({ state }) {
    if (state.embedded) {
      if (process.client) {
        const height = document.getElementById('container').scrollHeight
        // const body = document.body
        // const html = document.documentElement
        // const height = Math.max(body.scrollHeight, body.offsetHeight,
        //   html.clientHeight, html.scrollHeight, html.offsetHeight)
        window.parent.postMessage({
          frameHeight: height
        }, '*')
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
