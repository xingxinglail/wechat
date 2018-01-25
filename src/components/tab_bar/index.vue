<template>
  <div class="weui-tab">
    <div class="weui-tabbar">
      <router-link tag="a" class="weui-tabbar__item" :to="{path: '/message', query: {notranfrom: '1'}}" exact>
        <div class="badge-wrapper">
          <badge :count="messageCount"></badge>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="icon"></use>
          </svg>
        </div>
        <p class="weui-tabbar__label">微信</p>
      </router-link>
      <router-link tag="a" class="weui-tabbar__item" :to="{path: '/address', query: {notranfrom: '1'}}" exact>
        <div class="badge-wrapper">
          <badge :count="addMessageCount"></badge>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="icon2"></use>
          </svg>
        </div>
        <p class="weui-tabbar__label">通讯录</p>
      </router-link>
      <router-link tag="a" class="weui-tabbar__item" :to="{path: '/discovery', query: {notranfrom: '1'}}" exact>
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="icon3"></use>
        </svg>
        <p class="weui-tabbar__label">发现</p>
      </router-link>
      <router-link tag="a" class="weui-tabbar__item" :to="{path: '/user', query: {notranfrom: '1'}}" exact>
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="icon4"></use>
        </svg>
        <p class="weui-tabbar__label">我</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Badge from 'components/badge'

  export default {
    name: 'tab-bar',
    props: {
      tab: {
        type: String
      }
    },
    methods: {
      onchangetab (tab) {
        this.$emit('change-tab', tab)
      }
    },
    computed: {
      ...mapGetters(['user', 'addFriendMsg', 'rooms']),
      addMessageCount () { // 未读好友请求数
        return this.addFriendMsg.filter(o => o.isRead === 0).length
      },
      messageCount () { // 未读消息数
        let count = 0
        const rooms = this.rooms
        for (let i = 0; i < rooms.length; i++) {
          for (let j = 0; j < rooms[i].message.length; j++) {
            if (rooms[i].message[j].userId === this.user.wechat_id && rooms[i].message[j].isRead === 0) {
              count++
            }
          }
        }
        return count
      },
      icon () {
        return this.tab === '/message' ? '#icon-wechat' : '#icon-custom-wechat'
      },
      icon2 () {
        return this.tab === '/address' ? '#icon-tongxunlu' : '#icon-tongxunlu1'
      },
      icon3 () {
        return this.tab === '/discovery' ? '#icon-faxian' : '#icon-zhinanzhen1'
      },
      icon4 () {
        return this.tab === '/user' ? '#icon-woon2x' : '#icon-wooff2x'
      }
    },
    components: {
      Badge
    }
  }
</script>

<style lang='stylus' scoped>
  .weui-tab
    position fixed
    width 100%
    left 0
    bottom 0
    height 45px
    z-index 5
    .weui-tabbar
      background-color rgba(255, 255, 255, .8)
      backdrop-filter blur(8px)
    .icon
      width 22px
      height 22px
    .router-link-active
      p
        color #09bb07
      .icon
        color #09bb07
    .badge-wrapper
      position relative
      width 22px
      margin 0 auto
      .badge
        position absolute
        top -1px
        right -10px
</style>
