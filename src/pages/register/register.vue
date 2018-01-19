<template>
  <div class="register">
    <input-wrapper :my-input-data="myInputData"
                   @submit="onsubmit"></input-wrapper>
    <toast :toast-data="toastData"></toast>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import InputWrapper from 'components/login_and_register/input'
  import Register from 'api/register/register'
  import Utils from 'utils/util'
  import Socket from 'utils/socket'

  export default {
    name: 'register',
    data () {
      return {
        myInputData: {
          title: '使用手机号注册',
          rightBtnTxt: '登录',
          rightBtnPath: '/login',
          phone: '',
          password: '',
          type: 2,
          repeatPassword: '',
          submitTxt: '注册'
        },
        toastData: {
          show: false,
          type: 'loading',
          text: '请稍后'
        }
      }
    },
    methods: {
      ...mapMutations({setUser: 'SET_USER'}),
      async onsubmit () {
        this.toastData.show = true
        await Utils.delay()
        const user = {
          phone: this.myInputData.phone,
          password: this.myInputData.password
        }

        const { data } = await Register.register(user)
        if (data.code === 1) { // 存储用户信息,跳转路由
          this.setUser({
            phone: data.data.phone,
            wechat_id: data.data.wechat_id
          })

          Socket.connection(data.data.phone) // 连接socket

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
          alert(data.msg)
        }
      },
      clear () { // 清空注册信息
        this.myInputData.phone = ''
        this.myInputData.password = ''
        this.myInputData.repeatPassword = ''
      }
    },
    components: {
      InputWrapper
    }
  }
</script>

<style lang='stylus' scoped>
  .register
    position absolute
    background-color #fff
    top 0
    right 0
    bottom 0
    left 0
    padding 0 5%
    z-index 2
</style>
