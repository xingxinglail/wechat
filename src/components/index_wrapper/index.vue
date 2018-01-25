<template>
  <!-- 消息页,通讯录页,发现页,用户页框架 -->
  <div class="index-wrapper">
    <we-head :title="headController.title"
             :left-controller="headController.leftController"
             :right-controller="headController.rightController"
             @right-click="onheadrightclick"></we-head>
    <div class="content-wrapper">
      <slot></slot>
    </div>
    <tab-bar :tab="tab"></tab-bar>
    <transition name="fade">
      <div class="menu" v-if="showMenu">
        <div class="triangle"></div>
        <ul>
          <li class="flexbox border-1px">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jia"></use>
            </svg>
            <span>发起群聊</span>
          </li>
          <li class="flexbox" @click="goAddFriend">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon"></use>
            </svg>
            <span>添加朋友</span>
          </li>
        </ul>
      </div>
    </transition>
    <div class="shade" v-if="showMenu" @click="showMenu = false"></div>
  </div>
</template>

<script>
  import TabBar from 'components/tab_bar'
  import headConfig from 'config/index_head'

  export default {
    name: 'index-wrapper',
    activated () { // 进入路由设置tab改变头部状态
      this.tab = this.$route.path
    },
    data () {
      return {
        tab: '/message',
        showMenu: false // 控制消息列表页右上角菜单
      }
    },
    computed: {
      headController () { // 头部配置
        return headConfig[this.tab]
      }
    },
    methods: {
      onchangetab (tab) { // 切换
        this.tab = tab
      },
      onheadrightclick () { // 头部右边按钮点击事件
        const tab = this.tab
        if (tab === '/message') { // 消息页面就展开菜单
          this.showMenu = !this.showMenu
        } else if (tab === '/address') {
          this.goAddFriend()
        }
      },
      goAddFriend () { // 消息页面跳转添加朋友
        this.showMenu = false // 隐藏菜单
        this.$router.push({
          path: `${this.tab}/addfriend`,
          query: {
            source: this.source()
          }
        })
      },
      source () {
        const tab = this.tab
        console.log(tab)
        if (tab === '/message') {
          return '微信'
        }
        if (tab === '/address') {
          return '通讯录'
        }
        return ''
      },
      controllScroll (v) {
        console.log(v)
      }
    },
    components: {
      TabBar
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin.styl"

  .index-wrapper
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    overflow hidden
    .content-wrapper
      position absolute
      top 50px
      right 0
      bottom 45px
      left 0
      background-color $bg-color
    .shade
      position absolute
      top 50px
      left 0
      right 0
      bottom 0
      z-index 1
    .menu
      position absolute
      width 100px
      top 62px
      right 2%
      z-index 2
      color #fff
      padding 0 10px
      border-radius 2px
      background-color rgba(0, 0, 0, 0.9)
      .triangle
        position absolute
        top -8px
        right 10%
        border 8px solid rgba(0,0,0,0.9)
        border-left 5px solid transparent
        border-right 5px solid transparent
        border-top 0 solid transparent
      ul
        li
          padding 6px 0
          align-items center
          &.border-1px
            border-1px(#999)
          .icon
            margin-right 8px
            width 30px
            height 30px
            color #fff
</style>
