import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () => ({
  embedded: false
})

const getters = {
  isEmbedded(state) {
    console.log('getting status of embed: ' + state.embedded)
    return state.embedded
  }
}

const mutations = {
  SET_EMBEDDED(state) {
    console.log('changing value of embedded')
    state.embedded = true
  }
}

const actions = {
  checkEmbed({ commit }, payload) {
    console.log('checking embed status: ' + payload)
    if (payload === 'true' || payload === true) {
      console.log('this page is embedded')
      commit('SET_EMBEDDED')
    }
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
