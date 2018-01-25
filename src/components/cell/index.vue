<template>
  <div class="cell"
       @touchstart="start"
       @touchmove="move"
       @touchend="end"
       @click="click">
    <div class="border-1px"></div>
    <div class="content flexbox" ref="content">
      <div class="avatar">
        <div class="badge-wrapper">
          <badge :count="noReadCount"></badge>
        </div>
        <img v-if="room.users.avatar" src="room.users.avatar" />
        <img v-else src="../../assets/images/default_avatar.jpg" />
      </div>
      <div class="msg flexbox flex">
        <p class="title" v-if="room.type === 0">{{ room.users.remark ? room.users.remark : room.users.nikename ? room.users.nikename : room.users.phone }}</p>
        <p class="message" v-if="lastMsgData">{{ lastMsgData.text }}</p>
      </div>
      <div class="right">
        <p class="time" v-if="lastMsgData">{{ dateFormat(lastMsgData.time) }}</p>
      </div>
    </div>
    <div class="btn-wrapper" ref="btnwrapper">
      <a href="javascript:;" class="left">标记为未读</a>
      <a href="javascript:;" class="right">删除</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Badge from 'components/badge'
  import Utils from 'utils/util'

  export default {
    name: 'cell',
    created () {
      this.startX = 0
      this.startY = 0
      this.nextX = 0
    },
    mounted () {
      this.$nextTick(() => {
        this.content = this.$refs.content
        this.btnwrapper = this.$refs.btnwrapper
      })
    },
    props: {
      room: {
        type: Object
      }
    },
    data () {
      return {
        isMove: false // 是否正在滑动
      }
    },
    computed: {
      ...mapGetters(['user']),
      lastMsgData () {
        if (!this.room.message || this.room.message.length === 0) {
          return null
        }
        return this.room.message[this.room.message.length - 1]
      },
      noReadCount () {
        let count = 0
        for (let i = 0; i < this.room.message.length; i++) {
          const msg = this.room.message[i]
          if (this.user.wechat_id === msg.userId && msg.isRead === 0) {
            count += 1
          }
        }
        return count
      }
    },
    methods: {
      click () {
        this.$emit('my-click')
      },
      start (e) {
        const touches = e.touches[0]
        this.startX = touches.pageX
        this.startY = touches.startY
      },
      move (e) {
        this.content.style.transition = this.btnwrapper.style.transition = ''
        const touches = e.touches[0]
        const x = touches.pageX
        const y = touches.pageY
        if (this.startY === y && x !== this.startX) {
          this.isMove = true
        }
        let currentX = x - this.startX - this.nextX
        if (currentX >= 0) {
          currentX = 0
        }
        if (Math.abs(currentX) >= this.btnwrapper.offsetWidth) {
          currentX = -this.btnwrapper.offsetWidth
        }
        this.content.style.transform = `translate3d(${currentX}px, 0, 0)`
        this.btnwrapper.style.transform = `translate3d(${currentX}px, 0, 0)`
      },
      end (e) {
        this.isMove = false
        const x = e.changedTouches[0].pageX
        this.content.style.transition = this.btnwrapper.style.transition = 'transform .4s ease'
        if (x - this.startX < 0) {
          this.nextX = this.btnwrapper.offsetWidth
          this.content.style.transform = this.btnwrapper.style.transform = `translate3d(${-this.btnwrapper.offsetWidth}px, 0, 0)`
        } else {
          this.nextX = 0
          this.content.style.transform = this.btnwrapper.style.transform = 'translate3d(0, 0, 0)'
        }
      },
      reset () {
        this.nextX = 0
        this.content.style.transition = this.btnwrapper.style.transition = 'transform .4s ease'
        this.content.style.transform = this.btnwrapper.style.transform = 'translate3d(0, 0, 0)'
      },
      dateFormat (time) {
        return Utils.dateFormat(time, true)
      }
    },
    watch: {
      isMove (v) {
        this.$emit('controll-scroll', v)
      }
    },
    components: {
      Badge
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/mixin.styl"

  .cell
    height 56px
    overflow hidden
    background-color #fff
    padding-left 10px
    position relative
    .border-1px
      border-1px(#ccc)
      height 100%
    .content
      position absolute
      top 0
      left 0
      width calc(100% - 10px)
      height 40px
      padding 8px 0 8px 10px
      .avatar
        position relative
        width 40px
        height 40px
        margin-right 10px
        img
          width 100%
          height 100%
          border-radius 4px
        .badge-wrapper
          position absolute
          top -5px
          right -7px
      .msg
        flex-direction column
        justify-content center
        margin-right 10px
        p.title
          font-size 16px
        p.message
          color #999
      .right
        font-size 12px
        padding 0 8px
        color #999
    .btn-wrapper
      position absolute
      right -160px
      top 0
      height 56px
      font-size 0
      a
        display inline-block
        vertical-align top
        height 56px
        line-height 56px
        text-align center
        color #fff
        font-size 16px
        &.left
          width 104px
          background-color #d3d3d3
        &.right
          width 56px
          background-color #f00
</style>
