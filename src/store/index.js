import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import message from './modules/message'
import friend from './modules/friend'

// 控制台打印修改记录
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 开发环境使用
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    message,
    friend
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
