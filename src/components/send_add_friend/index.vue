<template>
  <div class="send-add-friend absolute">
    <we-head :title="headController.title"
             :left-controller="headController.leftController"
             :right-controller="headController.rightController"
             @left-click="onLeftClick"
             @right-click="onRightClick"></we-head>
    <div class="wrapper absolute">
      <scroll ref="scroll">
        <div class="inner">
          <div class="content">
            <div class="weui-cells__title">你需要发送验证申请,等对方通过</div>
            <div class="weui-cells weui-cells_form">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <input class="weui-input" type="text" maxlength="50" v-model="message" />
                </div>
                <div class="weui-cell__ft" v-show="message" @click="message = ''">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-qingkong"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <toast :toast-data="toastData"></toast>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from 'components/scroll'
  import headConfig from 'config/index_head'
  import addFriend from 'api/add_friend'
  import Utils from 'utils/util'

  export default {
    name: 'send-add-friend',
    props: {
      userId: {
        type: String
      },
      show: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: ''
      },
      success: { // 发送成功回调
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        message: `我是${this.name}`,
        toastData: {
          show: false,
          type: 'loading',
          text: '正在发送...'
        }
      }
    },
    computed: {
      ...mapGetters(['user']),
      headController () { // 头部配置
        return headConfig['send-add-friend']
      }
    },
    methods: {
      onLeftClick () {
        this.$emit('cloes')
      },
      async onRightClick () {
        this.toastData.show = true
        await Utils.delay(1000)
        const res = await addFriend.addFriend({
          fromId: this.user.wechat_id,
          userId: this.userId,
          message: this.message
        })
        console.log(res.data)
        this.toastData.type = 'success'
        this.toastData.text = '已发送'
        await Utils.delay(500)
        this.toastData.show = false
        this.$emit('cloes')
        await Utils.delay(500)
        this.toastData.type = 'loading'
        this.toastData.text = '正在发送'
      }
    },
    watch: {
      show (v) {
        if (v) {
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/variable.styl"

  .send-add-friend
    z-index 1
    background-color $bg-color
    .wrapper
      top 50px
      .inner
        min-height calc(100vh - 49px)
        overflow hidden
        .content
          margin-top 10px
          .icon
            font-size 16px
</style>
