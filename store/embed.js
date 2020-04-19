import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () => ({
  embed: false
})

const getters = {}

const mutations = {
  setEmbed(state) {
    state.embed = true
  }
}

const actions = {
  setEmbed({ commit }) {
    commit('setEmbed')
  },
  postResize({ state }) {
    if (state.embed) {
      if (process.client) {
        console.log('sending new height info')
        // TODO: need to see about adding a timeout delay while page loads?

        const body = document.body
        const html = document.documentElement
        const height = Math.max(body.scrollHeight, body.offsetHeight,
          html.clientHeight, html.scrollHeight, html.offsetHeight)
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
