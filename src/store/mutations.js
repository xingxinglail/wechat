import Utils from 'utils/util'
import * as types from './mutation-types'

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
    Utils.setLocal('user', user)
  },
  [types.SET_SOCKETID] (state, socketId) {
    state.socketId = socketId
  }
}

export default mutations
