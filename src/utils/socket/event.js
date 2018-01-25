import store from '../../store'
import * as types from '../../store/mutation-types'
import User from 'api/user'

function socketEvent (socket) {
  // 好友添加请求
  socket.on('new_friend', async ({fromId, message}) => {
    console.log('socket:on ---> new_friend')
    const userRes = await User.findUserByWechatId({wechat_id: fromId})
    userRes.data.isRead = 0 // 设置为未读
    userRes.data.message = message // 更新发送内容
    userRes.data.success = 0 // 设置未添加
    store.commit(types.SET_ONE_ADD_FRIEND_MSG, userRes.data)
  })

  // 通过好友请求
  socket.on('accept', async (data) => {
    console.log('socket:on ---> accept')
    const userRes = await User.findUserByWechatId({wechat_id: data.userId})
    store.commit(types.SET_ADD_FRIEND, userRes.data)
    data.userId = data.nowUserId
    store.dispatch('updateMsg', data)
  })

  // 聊天消息
  socket.on('message', async (data) => {
    console.log('socket:on ---> message')
    store.dispatch('updateMsg', data)
  })
}

export default socketEvent
