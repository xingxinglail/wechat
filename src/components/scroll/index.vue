<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll'

  export default {
    name: 'scroll',
    props: {
      click: {
        type: Boolean,
        default: true
      },
      scrollbar: {
        type: Boolean,
        default: false
      },
      probeType: {
        type: Number,
        default: 0
      },
      preventDefault: {
        type: Boolean,
        default: true
      },
      observeDOM: { // 自动检测DOM,然后refresh
        type: Boolean,
        default: false
      },
      isScrollStart: { // 是否监听滚动开始
        type: Boolean,
        default: false
      },
      isScrollEnd: { // 是否监听滚动结束
        type: Boolean,
        default: false
      }
    },
    created () {
      this.BScroll = null
    },
    mounted () {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      init () {
        this.BScroll = new BetterScroll(this.$refs.scroll, {
          click: this.click,
          scrollbar: this.scrollbar,
          probeType: this.probeType,
          preventDefault: this.preventDefault,
          observeDOM: this.observeDOM
        })
        if (this.isScrollStart) {
          this.BScroll.on('scrollStart', () => {
            this.$emit('scroll-start')
          })
        }

        if (this.isScrollEnd) {
          this.BScroll.on('scrollEnd', (data) => {
            this.$emit('scroll-end', data)
          })
        }
      },
      refresh () {
        this.BScroll && this.BScroll.refresh()
      },
      disable () {
        this.BScroll && this.BScroll.disable()
      },
      enable () {
        this.BScroll && this.BScroll.enable()
      },
      scrollToElement () {
        this.BScroll && this.BScroll.scrollToElement.apply(this.BScroll, arguments)
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .scroll
    height 100%
    position relative
</style>
