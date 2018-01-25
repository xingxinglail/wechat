import Utils from 'utils/util'
import addFriend from 'api/add_friend'
import * as types from '../mutation-types'

const state = {
  addFriendMsg: Utils.getLocal('add_friend_msg') || [], // 添加好友请求列表
  rooms: Utils.getLocal('rooms') || []
}

const mutations = {
  [types.SET_ADD_FRIEND_MSG] (state, addFriendMsg) {
    state.addFriendMsg = addFriendMsg
  },
  [types.SET_ONE_ADD_FRIEND_MSG] (state, obj) { // 更新好友请求消息
    const index = state.addFriendMsg.findIndex(o => o.wechat_id === obj.wechat_id)
    if (index === -1) {
      state.addFriendMsg.push(obj)
    } else {
      state.addFriendMsg[index].message = obj.message
      state.addFriendMsg[index].isRead = 0
    }
    Utils.setLocal('add_friend_msg', state.addFriendMsg)
  },
  [types.SET_ADD_FRIEND_MSG_READ] (state) { // 好友请求消息设置为已读
    for (let i = 0; i < state.addFriendMsg.length; i++) {
      if (state.addFriendMsg[i].isRead === 0) {
        state.addFriendMsg[i].isRead = 1
      }
    }
    Utils.setLocal('add_friend_msg', state.addFriendMsg)
  },
  [types.UPDATE_ADD_FRIEND_MSG] (state, fromID) { // 验证通过后更新好友添加请求msg
    const index = state.addFriendMsg.findIndex(o => o.wechat_id === fromID)
    state.addFriendMsg[index].success = 1
    state.addFriendMsg[index].isRead = 1
    Utils.setLocal('add_friend_msg', state.addFriendMsg)
  },
  [types.SET_ROOMS] (state, rooms) {
    state.rooms = rooms
    Utils.setLocal('rooms', rooms)
  },
  [types.SET_ADD_ROOM] (state, room) { // 收到一条消息,如果有房间则更新消息,否则添加房间
    const index = state.rooms.findIndex(o => o.roomId === room.roomId)
    if (index === -1) {
      state.rooms.unshift(room)
    } else {
      const data = {
        fromId: room.fromId,
        userId: room.userId,
        text: room.text,
        isRead: room.isRead,
        time: room.time
      }
      state.rooms[index].message.push(data)
    }
    Utils.setLocal('rooms', state.rooms)
  },
  [types.SET_UPDATE_ROOMID] (state, {nextRoomId, roomId}) { // 更新roomid
    const room = state.rooms.find(o => o.roomId === nextRoomId)
    room.roomId = roomId
    Utils.setLocal('rooms', state.rooms)
  },
  [types.SET_MSG_READ] (state, roomId) {
    const room = state.rooms.find(o => o.roomId === roomId)
    for (let i = 0; i < room.message.length; i++) {
      if (room.message[i].fromId === room.users.wechat_id) {
        room.message[i].isRead = 1
      }
    }
    Utils.setLocal('rooms', state.rooms)
  }
}

const actions = {
  setAddFriendMsgRead ({commit, state}, userId) {
    addFriend.readMessage({userId})
    commit(types.SET_ADD_FRIEND_MSG_READ)
  },
  updateMsg ({commit, rootState}, data) {
    if (data.users === undefined && data.message === undefined) {
      const newData = {
        roomId: data.roomId,
        type: 0,
        users: rootState.friend.friends.find(o => o.wechat_id === data.fromId),
        message: [{
          fromId: data.fromId,
          userId: data.userId,
          text: data.text,
          isRead: 0,
          time: data.time
        }]
      }
      commit(types.SET_ADD_ROOM, newData)
    } else {
      commit(types.SET_ADD_ROOM, data)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
