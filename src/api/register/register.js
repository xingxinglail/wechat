import axios from 'axios'
import qs from 'qs'
import config from '../congif'

/**
 * [register 注册接口]
 * @param user 包含手机号和密码
 * @returns {Promise.<void>} 包含code,手机号和微信id
 */
async function register (user) {
  const res = await axios.post(`http://${config.host}:3000/api/register`, qs.stringify(user))
  return res
}

const Register = {
  register
}

export default Register
