import * as types from '../mutation-types'

const state = {
  count: 2000
}

const getters = {
  count: state => state.count
}

const mutations = {
  [types.ADD] (state, count) {
    state.count++
  }
}

const actions = {
  add ({ commit }, val) {
    commit(types.ADD, val)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
