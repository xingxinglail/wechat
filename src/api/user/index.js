import axios from 'axios'
import qs from 'qs'
import config from '../congif'

/**
 * [findUser 用户查找]
 * @param [Object] value 微信号或手机号
 * @returns {Promise.<void>} 包含微信id,昵称,头像,地址,性别,个性签名,微信号
 */
async function findUser (value) {
  const res = await axios.post(`http://${config.host}:3000/api/user/search`, qs.stringify(value))
  return res
}

/**
 * [ getFriends 获取好友 ]
 * @param [Object] value 微id
 * @returns {Promise<any>} 包含用户列表
 */
async function getFriends (value) {
  const res = await axios.post(`http://${config.host}:3000/api/user/friends`, qs.stringify(value))
  return res
}

/**
 * [ findUserByWechatId 根据微信id查找一个用户 ]
 * @param [Object] value 包含 wechat_id 微信id
 * @returns {Promise<any>}
 */
async function findUserByWechatId (value) {
  const res = await axios.post(`http://${config.host}:3000/api/user/getuser`, qs.stringify(value))
  return res
}

const User = {
  findUser,
  getFriends,
  findUserByWechatId
}

export default User
