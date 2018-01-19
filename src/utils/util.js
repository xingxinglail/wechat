const KEYPREFIX = 'wechat_'

const util = {
  delay,
  setSession,
  getSession,
  setLocal,
  getLocal
}

/**
 * [延时方法 delay]
 * @param timer 延时多少毫秒
 * @returns {Promise.<void>}
 */
async function delay (timer) {
  if (!timer) timer = 1000
  await new Promise((resolve) => {
    setTimeout(resolve, timer)
  })
}

/**
 * [ 设置本地存储 setSession]
 * @param [String] key 名字
 * @param [Object] value 值
 * @return void
 */
function setSession (key, value) {
  window.sessionStorage.setItem(KEYPREFIX + key, JSON.stringify(value))
}

/**
 * [ 获取本地存储 setSession]
 * @param [String] key 名字
 * @param key
 * @return [Object]
 */
function getSession (key) {
  return JSON.parse(window.sessionStorage.getItem(KEYPREFIX + key))
}

/**
 * [ 设置本地存储 setLocal]
 * @param [String] key 名字
 * @param [Object] value 值
 * @return void
 */
function setLocal (key, value) {
  window.localStorage.setItem(KEYPREFIX + key, JSON.stringify(value))
}

/**
 * [ 获取本地存储 getLocal]
 * @param [String] key 名字
 * @param key
 * @return [Object]
 */
function getLocal (key) {
  return JSON.parse(window.localStorage.getItem(KEYPREFIX + key))
}

export default util
