export const user = state => state.user // 获取用户信息

export const socketId = state => state.socketId // 获取socketId

export const addFriendMsg = state => state.message.addFriendMsg // 获取好友添加请求消息

export const rooms = state => state.message.rooms // 获取房间列表

export const friends = state => state.friend.friends // 获取所有好友
