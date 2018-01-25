<template>
  <IndexWrapper>
    <scroll ref="scroll">
      <div class="message">
        <div class="content pos">
          <cell v-for="(item, index) in rooms"
                :key="item.roomId"
                ref="cell"
                :room="item"
                @controll-scroll="controllScroll"
                @my-click="goChat(item.roomId)"></cell>
        </div>
      </div>
    </scroll>
  </IndexWrapper>
</template>

<script>
  import { mapGetters } from 'vuex'
  import IndexWrapper from 'components/index_wrapper'
  import Cell from 'components/cell'
  import Scroll from 'components/scroll'

  export default {
    name: 'message',
    mounted () {
      this.$nextTick(() => {
        const cells = this.$refs.cell
        document.addEventListener('touchstart', () => {
          for (let i = 0; i < cells.length; i++) {
            cells[i].reset()
          }
        })
      })
    },
    data () {
      return {
        tab: 'message'
      }
    },
    computed: {
      ...mapGetters(['user', 'rooms', 'friends'])
    },
    methods: {
      goChat (roomId) {
        this.$router.push({
          path: `/message/chat`,
          query: {
            source: '微信',
            roomId
          }
        })
      },
      controllScroll (v) {
        console.log(11)
        if (v) {
          this.$refs.scroll.disable()
          console.log(456456)
        } else {
          this.$refs.scroll.enable()
        }
      }
    },
    components: {
      IndexWrapper,
      Cell,
      Scroll
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/mixin.styl"

  .message
    min-height calc(100vh - 94px)
</style>
