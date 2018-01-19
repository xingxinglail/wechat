<template>
  <IndexWrapper>
    <div class="message">
      <div class="content pos">
        <div v-for="(item, index) in rooms" @click="goChat(item.roomId)">
          <div v-if="item.type === 0">{{ item.users.remark ? item.users.remark : item.users.nikename ? item.users.nikename : item.users.phone }}</div>
        </div>
      </div>
    </div>
  </IndexWrapper>
</template>

<script>
  import { mapGetters } from 'vuex'
  import IndexWrapper from 'components/index_wrapper'

  export default {
    name: 'message',
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
      }
    },
    components: {
      IndexWrapper
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/mixin.styl"

  .message
    min-height calc(100vh - 94px)
    line-height 30px
</style>
