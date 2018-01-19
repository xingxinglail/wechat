import axios from 'axios'
import qs from 'qs'
import config from '../congif'

/**
 * [ createRoom 创建房间 ]
 * @param [Object] data 包含发送者fromId, 接着收userId 和消息text time时间
 * @returns {Promise<any>}
 */
async function createRoom (data) {
  const res = await axios.post(`http://${config.host}:3000/api/room`, qs.stringify(data))
  return res
}

const room = {
  createRoom
}

export default room
