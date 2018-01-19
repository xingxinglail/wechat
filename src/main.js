import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Toast from 'components/global/toast'
import WeHead from 'components/global/head'
import Socket from 'utils/socket'
import 'weui/dist/style/weui.min.css'
import 'assets/stylus/index.styl'

import VConsole from 'vconsole'

/* eslint-disable no-new */
new VConsole()

Vue.config.productionTip = false

// 全局组件
Vue.component('toast', Toast)
Vue.component('we-head', WeHead)

// 防止用户刷新连接socket
if (store.state.user) {
  Socket.connection(store.state.user.phone)
}

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
