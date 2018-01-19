import Utils from 'utils/util'
import addFriend from 'api/add_friend'
import * as types from '../mutation-types'

const state = {
  friends: Utils.getLocal('friends') || []
}

const mutations = {
  [types.SET_FRIENDS] (state, friends) {
    state.friends = friends
    Utils.setLocal('friends', state.friends)
  },
  [types.SET_ADD_FRIEND] (state, friend) {
    state.friends.push(friend)
    Utils.setLocal('friends', state.friends)
  }
}

const actions = {
  async accept ({ commit, rootState }, fromObj) {
    const res = await addFriend.accept({fromId: fromObj.wechat_id, userId: rootState.user.wechat_id})
    if (res.data.code === 1) {
      commit(types.SET_ADD_FRIEND, fromObj)
      commit(types.UPDATE_ADD_FRIEND_MSG, fromObj.wechat_id)
      return {
        code: 1
      }
    } else {
      return {
        code: 0,
        msg: res.data.msg
      }
    }
  }
}

export default {
  state,
  actions,
  mutations
}
