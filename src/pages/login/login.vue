<template>
  <div class="login">
    <input-wrapper :my-input-data="myInputData"
                   @submit="onsubmit"></input-wrapper>
    <toast :toast-data="toastData"></toast>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import InputWrapper from 'components/login_and_register/input'
  import Utils from 'utils/util'
  import Login from 'api/login'
  import User from 'api/user'
  import addFriend from 'api/add_friend'
  import Message from 'api/message'
  import Socket from 'utils/socket'

  export default {
    name: 'login',
    data () {
      return {
        myInputData: {
          title: '使用手机号登录',
          rightBtnTxt: '注册',
          rightBtnPath: '/register',
          phone: '',
          password: '',
          type: 1,
          submitTxt: '登录'
        },
        toastData: {
          show: false,
          type: 'loading',
          text: '请稍后'
        }
      }
    },
    methods: {
      ...mapMutations({
        setUser: 'SET_USER',
        setAddFriendMsg: 'SET_ADD_FRIEND_MSG',
        setFriends: 'SET_FRIENDS',
        setRooms: 'SET_ROOMS'
      }),
      async onsubmit () {
        this.toastData.show = true
        await Utils.delay()
        const user = {
          phone: this.myInputData.phone,
          password: this.myInputData.password
        }

        const { data } = await Login.login(user).catch(async e => {
          this.toastData.show = false
          alert('请求超时,请稍后重试!')
        })
        if (data.code === 1) { // 存储用户信息,跳转路由
          this.setUser({
            phone: data.data.phone,
            wechat_id: data.data.wechat_id,
            nikename: data.data.nikename,
            avatar: data.data.avatar,
            address: data.data.address,
            sex: data.data.sex,
            signature: data.data.signature,
            qrCode: data.data.qrCode,
            customizeId: data.data.customizeId
          })

          Socket.connection(data.data.phone) // 连接socket

          // 获取好友存储
          const res = await User.getFriends({wechat_id: data.data.wechat_id})
          this.setFriends(res.data.data)

          // 获取所有房间
          const allMessage = await Message.getAllMessage({userId: data.data.wechat_id})
          this.setRooms(allMessage.data)

          // 获取添加好友请求
          const addFriendMessages = await addFriend.getAddMessage({userId: data.data.wechat_id})
          Utils.setLocal('add_friend_msg', addFriendMessages.data.data)
          this.setAddFriendMsg(addFriendMessages.data.data)
          this.$router.push({
            path: '/message',
            query: {
              notranfrom: '1'
            }
          })
          this.toastData.show = false
          this.clear()
        } else {
          this.toastData.show = false
          await Utils.delay(300)
          alert(data.msg)
        }
      },
      clear () { // 清除登录数据
        this.myInputData.phone = ''
        this.myInputData.password = ''
      }
    },
    components: {
      InputWrapper
    }
  }
</script>

<style lang='stylus' scoped>
  .login
    position absolute
    background-color #fff
    top 0
    right 0
    bottom 0
    left 0
    padding 0 5%
    z-index 2
    h2
      font-weight 400
      text-align center
      margin 10% auto
</style>
