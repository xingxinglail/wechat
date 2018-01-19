import axios from 'axios'
import qs from 'qs'
import config from '../congif'

/**
 * [login 登录接口]
 * @param [Object] user 包含手机号和密码
 * @returns {Promise.<void>} [Object] 包含code,手机号和微信id
 */
async function login (user) {
  const res = await axios.post(`http://${config.host}:3000/api/login`, qs.stringify(user))
  return res
}

const Login = {
  login
}

export default Login
