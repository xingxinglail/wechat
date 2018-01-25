<template>
  <div id="app" class="app absolute">
    <transition :name="transitionName">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        transitionName: ''
      }
    },
    watch: {
      $route (to, from) {
        // 首页4个页面不要切换动画
        if (to.query.notranfrom === '1' && from.query.notranfrom === '1') {
          this.transitionName = ''
          return
        }
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .app
    overflow hidden

  .slide-left-enter-active, .slide-right-leave-active
    z-index 9999

  .slide-left-enter-active, .slide-left-leave-active,
  .slide-right-enter-active, .slide-right-leave-active
    position absolute
    width 100%
    top 0
    left 0
    transition transform .4s ease

  .slide-left-enter, .slide-right-leave-to
    transform translate3d(100%, 0, 0)

  .slide-left-leave-to, .slide-right-enter
    transform translate3d(-20%, 0, 0)
</style>
