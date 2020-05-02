import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () => ({
  iFrame: false
})

const getters = {
  isIFrame(state) {
    return state.iFrame
  }
}

const mutations = {
  SET_IFRAME(state) {
    state.iFrame = true
  }
}

const actions = {
  setIFrame({ commit }) {
    commit('SET_IFRAME')
  },
  postResize({ state }) {
    if (state.iFrame) {
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
