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
      },
      refresh () {
        this.BScroll && this.BScroll.refresh()
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .scroll
    height 100%
    position relative
</style>
