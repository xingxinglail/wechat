<template>
  <div class="head">
    <div class="left-btn btn flexbox" v-if="leftController.show" @click="back">
      <svg class="icon" aria-hidden="true" v-if="!leftController.txt">
        <use xlink:href="#icon-llmainpageback"></use>
      </svg>
      <span>{{ leftController.txt ? leftController.txt : $route.query.source }}</span>
    </div>
    <h1 v-html="title"></h1>
    <div class="right-btn btn flexbox" :class="{active: rightController.html}" @click="rightClick">
      <div v-if="rightController.html" v-html="rightController.html"></div>
      <svg class="icon" aria-hidden="true" v-else>
        <use :xlink:href="rightController.icon"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'we-head',
    props: {
      leftController: { // 包含显示隐藏,标题
        type: Object
      },
      rightController: { // 包含显示隐藏,icon
        type: Object
      },
      title: {
        type: String
      }
    },
    methods: {
      back () { // 返回
        if (this.leftController.noBack) {
          this.$emit('left-click')
        } else {
          this.$router.go(-1)
        }
      },
      rightClick () {
        this.$emit('right-click')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/variable.styl"

  .head
    position absolute
    top 0
    left 0
    right 0
    height 50px
    z-index 1
    background-color rgba(0, 0, 0, .85)
    backdrop-filter blur(8px)
    h1
      font-weight 500
      font-size 18px
      color #fff
      line-height 50px
      text-align center
    .btn
      padding 0 1%
      margin 0 2%
      position absolute
      top 0
      bottom 0
    .left-btn
      left 0
      height 100%
      align-items center
      color #fff
      .icon
        width 24px
        height 24px
      span
        font-size 16px
    .right-btn
      right 0
      height 100%
      align-items center
      &:active
        .icon
          color #999
      .icon
        width 30px
        height 30px
        font-weight 600
        color #fff
      &.active
        color $color
        &:active
          opacity .7
</style>
