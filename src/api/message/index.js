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

/**
 * [ send 发送消息 ]
 * @param [Object] data 包含roomId房间号 fromId发送者 userId接受者 text消息内容 消息发送时间MCreateTime
 * @returns {Promise<any>}
 */
async function send (data) {
  const res = await axios.post(`http://${config.host}:3000/api/message/send`, qs.stringify(data))
  return res
}

/**
 * [ readMsg 设置消息为已读 ]
 * @param [Object] data 包含roomId房间号 userId接受者
 * @returns {Promise<any>}
 */
async function readMsg (data) {
  const res = await axios.post(`http://${config.host}:3000/api/message/read`, qs.stringify(data))
  return res
}

const message = {
  getAllMessage,
  send,
  readMsg
}

export default message
