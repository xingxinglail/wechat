<template>
  <div class="search">
    <div class="head flexbox border-1px">
      <div class="input-wrapper flexbox flex">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <div class="flex">
          <form action="" @submit.prevent="onsubmit">
            <input type="search" v-model="search" ref="input" :placeholder="placeholder" />
          </form>
        </div>
        <svg class="icon clear" aria-hidden="true" v-show="search.length > 0" @click="clear">
          <use xlink:href="#icon-qingkong"></use>
        </svg>
      </div>
      <span @click="cloes">取消</span>
    </div>
    <div class="cssrepeat result" v-show="result === null && search">
      <p class="no-result">该用户不存在</p>
    </div>
    <div class="cssrepeat search-text" v-show="result !== null && search">
      <div class="padding border-1px ac" @click="onsubmit">
        <div class="flexbox wrapper">
          <div class="flexbox">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
          </div>
          <span class="center">搜索:</span>
          <span class="value flex">{{ search }}</span>
        </div>
      </div>
    </div>
    <div class="cssrepeat filter" @click="cloes"></div>
    <toast :toast-data="toastData"></toast>
  </div>
</template>

<script>
  export default {
    name: 'search',
    props: {
      type: { // 1搜索用户 2全局搜索
        type: Number
      },
      result: {
        type: Array,
        default () {
          return []
        }
      },
      toastData: {
        type: Object,
        default () {
          return {
            show: false
          }
        }
      }
    },
    created () {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    data () {
      return {
        search: ''
      }
    },
    computed: {
      placeholder () {
        return this.type === 1 ? '微信号/手机号' : '搜索'
      }
    },
    methods: {
      cloes () {
        this.$emit('cloes')
      },
      onsubmit () {
        if (this.search !== '') {
          this.$emit('seach-submit', this.search)
        }
      },
      clear () { // 清空搜索
        this.$refs.input.focus()
        this.search = ''
        this.$emit('clear-search')
      }
    },
    watch: {
      search (v) {
        if (v.length === 0) {
          this.$emit('clear-search')
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"

  .search
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    z-index 2
    .head
      padding 0 6px
      align-items center
      height 50px
      background-color $bg-color
      border-1px(#ccc)
      .input-wrapper
        align-items center
        background-color #fff
        border-radius 2px
        height 32px
        input
          width 100%
          height 32px
        .icon
          color #666
          padding 0 6px
        .clear
          width 16px
          height 16px
          padding 8px 6px
      span
        margin-left 6px
        color $color
        transition 0.3s ease
        &:active
          opacity 0.7
    .cssrepeat
       position absolute
       top 50px
       right 0
       bottom 0
       left 0
    .filter
      background-color rgba(255, 255, 255, .7)
      backdrop-filter blur(6px)
    .result
      z-index 1
      p.no-result
        padding 30px 0
        color #999
        background-color #fff
        text-align center
    .search-text
      z-index 1
      background-color #fff
      .padding
        padding 8px 10px 0 10px
        .wrapper
          border-1px(#f8f8f8)
          padding-bottom 8px
          align-items center
          .flexbox
            width 44px
            height 44px
            align-items center
            justify-content center
            border-radius 3px
            background-color $color
            .icon
              color #fff
              font-size 22px
          span
            font-weight 500
            &.center
              padding 0 6px
            &.value
              color $color
              white-space nowrap
              text-overflow ellipsis
              overflow hidden
</style>
