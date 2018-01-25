import moment from 'moment'

const KEYPREFIX = 'wechat_'

const util = {
  delay,
  setSession,
  getSession,
  setLocal,
  getLocal,
  dateFormat
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

function getWeek (num) {
  const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return week[num]
}

/**
 * [ 日期转换 ]
 * @param [String] date 2018-01-01 12:12:12
 * @param [Boolean] mark 是否简写
 */
function dateFormat (date, mark) {
  const dayUnix = 86400
  const nowUnix = moment(moment().format('YYYY-MM-DD')).format('X') // 今天时间戳
  const nextUnix = nowUnix + dayUnix
  const prevUnix = nowUnix - dayUnix
  const dateUnix = moment(date).format('X') // 转换后的时间戳

  if (dateUnix >= nowUnix && dateUnix < nextUnix) { // 今天
    return moment(date).format('HH:mm')
  } else if (dateUnix >= prevUnix && dateUnix < nowUnix) {
    if (mark) return '昨天'
    return `昨天 ${moment(date).format('HH:mm')}`
  } else if (nowUnix - dateUnix < dayUnix * 6) {
    if (mark) return getWeek(moment(date).weekday())
    return `${getWeek(moment(date).weekday())} ${moment(date).format('HH:mm')}`
  } else {
    if (mark) return moment(date).format('YYYY/M/D')
    return moment(date).format('YYYY年M月D日 HH:mm')
  }
}

export default util
