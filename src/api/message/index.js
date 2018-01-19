import axios from 'axios'
import qs from 'qs'
import config from '../congif'

/**
 * [ getAllMessage 获取所有消息 ]
 * @param [Object] data 包含userId
 * @returns {Promise<any>}
 */
async function getAllMessage (data) {
  const res = await axios.post(`http://${config.host}:3000/api/message`, qs.stringify(data))
  return res
}

const message = {
  getAllMessage
}

export default message
