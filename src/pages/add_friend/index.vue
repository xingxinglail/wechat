<template>
  <div class="add-friend absolute">
    <we-head :title="headController.title"
             :left-controller="headController.leftController"
             :right-controller="headController.rightController"></we-head>
    <div class="content">
      <div class="weui-cells weui-cells_form" @click="showSearch = !showSearch">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" disabled placeholder="微信号/手机号"/>
          </div>
        </div>
      </div>
      <div class="mywechat">
        <div v-if="user.signature">我的微信号:{{ user.signature }}</div>
        <div v-else>我的二维码</div>
      </div>
    </div>
    <search v-if="showSearch"
            :type="1"
            @cloes="showSearch = false"
            @seach-submit="onsubmit"
            @clear-search="onclearsearch"
            :result="result"
            :toast-data="toastData"></search>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Search from 'components/search'
  import User from 'api/user'
  import Utils from 'utils/util'
  import headConfig from 'config/index_head'

  export default {
    name: 'add-friend',
    data () {
      return {
        showSearch: false, // 显示搜索组件
        toastData: { // 控制search组件内toast组件
          show: false,
          type: 'loading',
          text: '正在搜索...'
        },
        result: [] // 搜索结果
      }
    },
    computed: {
      ...mapGetters(['user']),
      headController () { // 头部配置
        return headConfig['/addfriend']
      }
    },
    methods: {
      leftClick () { // 返回按钮点击执行
        this.$emit('back')
      },
      onback () {
        this.showDetails = false
      },
      async onsubmit (search) {
        this.toastData.show = true
        await Utils.delay()
        const { data } = await User.findUser({id: search})
        this.toastData.show = false
        if (data.code === 1) {
          if (data.data.wechat_id === this.user.wechat_id) {
            alert('你不能添加自己到通讯录')
          } else { // 进入详细资料页面
            this.result = [data.data]
            Utils.setSession('user_detail', data.data)
            this.$router.push({
              path: `${this.$route.path}/userdetail`,
              query: {
                source: '添加好友'
              }
            })
          }
        } else { // 没有该用户
          this.result = null
        }
      },
      onclearsearch () {
        this.result = []
      }
    },
    components: {
      Search
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/variable.styl"

  .add-friend
    background-color $bg-color
    .head
      .left-controller
        height 100%
        align-items center
        color #fff
        .icon
          width 24px
          height 24px
        span
          font-size 16px
    .content
      position absolute
      top 50px
      left 0
      right 0
      bottom 0
      .weui-cells_form
        .icon
          color $color
          margin-right 15px
      .mywechat
        margin 8px auto
        text-align center
</style>
