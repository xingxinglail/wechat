import axios from 'axios'
import qs from 'qs'
import config from '../congif'

/**
 * [addFriend 添加好友]
 * @param [Object] user 包含fromId和UserId
 * @returns {Promise.<void>} [Object] 包含code,手机号和微信id
 */
async function addFriend (data) {
  const res = await axios.post(`http://${config.host}:3000/api/addfriend`, qs.stringify(data))
  return res
}

/**
 * [ getAddMessage 获取好友添加请求列表 ]
 * @param [Object] data 包含userId
 * @returns {Promise<any>}
 */
async function getAddMessage (data) {
  const res = await axios.post(`http://${config.host}:3000/api/addfriend/message`, qs.stringify(data))
  return res
}

/**
 * [ readMessage 把所有未读消息设置为已读 ]
 * @param [Object] data 包含userId
 */
function readMessage (data) {
  axios.post(`http://${config.host}:3000/api/addfriend/read`, qs.stringify(data))
}

/**
 * [ accept 通过好友请求 ]
 * @param [Object] data 包含userId,fromId
 * @returns {Promise<any>}
 */
async function accept (data) {
  const res = await axios.post(`http://${config.host}:3000/api/addfriend/accept`, qs.stringify(data))
  return res
}

const add = {
  addFriend,
  getAddMessage,
  readMessage,
  accept
}

export default add
