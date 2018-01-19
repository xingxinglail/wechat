import Utils from 'utils/util'

const state = {
  user: Utils.getLocal('user'), // 防止用户刷新,
  socketId: ''
}

export default state
