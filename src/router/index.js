import Vue from 'vue'
import Router from 'vue-router'

import Register from 'pages/register/register'
import Login from 'pages/login/login'
import AddFriend from 'pages/add_friend'
import UserDetail from 'pages/user_detail'
import Message from 'pages/message'
import AddressBook from 'pages/address'
import NewFriend from 'pages/new_friend'
import ChatOne from 'pages/chat/one'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect () {
        return {
          path: '/message',
          query: {
            notranfrom: '1'
          }
        }
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        auth: true
      }
    },
    {
      path: '/address',
      name: 'AddressBook',
      component: AddressBook,
      meta: {
        auth: true
      }
    },
    {
      path: '/address/newfriend',
      name: 'NewFriend',
      component: NewFriend,
      meta: {
        auth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/addfriend',
      name: 'AddFriend',
      component: AddFriend,
      alias: ['/message/addfriend', '/address/addfriend'],
      meta: {
        auth: true
      }
    },
    {
      path: '/userdetail',
      name: 'UserDetail',
      component: UserDetail,
      alias: ['/message/addfriend/userdetail', '/address/userdetail', '/address/addfriend/userdetail', '/address/newfriend/userdetail'],
      meta: {
        auth: true
      }
    },
    {
      path: '/chat',
      name: 'ChatOne',
      component: ChatOne,
      alias: ['/message/chat', '/address/userdetail/chat'],
      meta: {
        auth: true
      }
    }
  ]
})
