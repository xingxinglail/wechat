<template>
  <div class="chat-one absolute">
    <we-head v-if="headController"
             :title="headController.title"
             :left-controller="headController.leftController"
             :right-controller="headController.rightController"></we-head>
    <div class="content-wrappre absolute" v-if="room">
      <scroll>
        <div class="inner">
          <ul>
            <li v-for="(item, index) in room.message" :key="index">
              <div class="time flexbox"><span class="timer">{{ item.time }}</span></div>
              <div class="message">
                <div v-if="item.fromId === user.wechat_id" class="my flexbox">
                  <div class="text">{{ item.text }}</div>
                  <div class="avatar">
                    <img v-if="user.avatar" :src="user.avatar" />
                    <img v-else src="../../assets/images/default_avatar.jpg" />
                  </div>
                </div>
                <div v-else class="other flexbox">
                  <div class="avatar">
                    <img v-if="room.users.avatar" :src="room.users.avatar" />
                    <img v-else src="../../assets/images/default_avatar.jpg" />
                  </div>
                  <div class="text">{{ item.text }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <div class="footer flexbox">
      <div class="border-t-1px"></div>
      <p @click="send">发送</p>
      <textarea ref="textarea" v-model="message"></textarea>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import moment from 'moment'
  import autosize from 'autosize'
  import Scroll from 'components/scroll'
  import headConfig from 'config/index_head'
  import Utils from 'utils/util'
  import Room from 'api/room'

  export default {
    name: 'chat-one',
    mounted () {
      this.$nextTick(() => {
        autosize(this.$refs.textarea)
        this.$refs.textarea.addEventListener('autosize:resized', () => {
          console.log('textarea height updated')
        })
      })
    },
    activated () {
      if (this.$route.query.roomId === undefined || this.$route.query.roomId === '') {
        this.$router.go(-1)
      } else {
        this.roomId = this.$route.query.roomId
      }
    },
    data () {
      return {
        message: '',
        roomId: ''
      }
    },
    computed: {
      ...mapGetters(['user', 'rooms']),
      headController () { // 头部配置
        if (this.room) {
          if (this.room.type === 0) {
            const user = this.room.users
            headConfig['/chat'].title = user.remark ? user.remark : user.nikename ? user.nikename : user.phone
            return headConfig['/chat']
          } else {
            const data = Utils.getSession('user_detail')
            headConfig['/chat'].title = data.remark ? data.remark : data.nikename ? data.nikename : data.phone
            return headConfig['/chat']
          }
        } else {
          return null
        }
      },
      room () {
        const roomId = this.roomId
        if (roomId === '0') return null
        return this.rooms.find(o => o.roomId === roomId)
      }
    },
    methods: {
      ...mapMutations({
        updateRoomId: 'SET_UPDATE_ROOMID'
      }),
      ...mapActions(['updateMsg']),
      async send () {
        const message = this.message
        if (message.trim() === '') {
          alert('不能发送空白消息!')
          this.message = ''
          return
        }
        if (!this.room) { // 创建房间
          const user = Utils.getSession('user_detail')
          this.roomId = user.wechat_id
          const data = {
            roomId: user.wechat_id,
            type: 0,
            users: user,
            message: [{
              fromId: this.user.wechat_id,
              userId: user.wechat_id,
              text: message,
              isRead: 0,
              time: moment().format('YYYY-MM-DD HH:mm:ss')
            }]
          }
          this.updateMsg(data)
          const createRoomData = {
            fromId: this.user.wechat_id,
            userId: user.wechat_id,
            text: message,
            time: data.message[0].time
          }
          const res = await Room.createRoom(createRoomData)
          if (res.data.code === 1) {
            this.updateRoomId({
              nextRoomId: user.wechat_id,
              roomId: res.data.roomId
            })
            this.roomId = res.data.roomId
            this.$router.replace({
              path: this.$route.path,
              query: {
                roomId: res.data.roomId
              }
            })
          }
        } else {
          console.log('直接发送')
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"

  .chat-one
    background-color $bg-color
    .content-wrappre
      top 50px
      bottom 43px
      .inner
        min-height calc(100vh - 92px)
        ul
          padding 0 2%
          li
            .time
              justify-content center
              margin-top 8px
              span
                padding 4px 6px
                background-color rgba(0, 0, 0, .3)
                font-size 12px
                max-width 80%
                color #fff
                border-radius 6px
            .message
              overflow hidden
              margin 12px 0
              .my
                justify-content flex-end
                .text
                  background-color #a2e55a
              .avatar
                width 36px
                height 36px
                img
                  width 36px
                  height 36px
              .text
                padding 5px
                margin-right 10px
                border-radius 5px
                max-width 66%
                font-size 16px
                border 1px solid #ccc
                background-color #fff
              .other
                .text
                  margin-right 0
                  margin-left 10px
    .footer
      position absolute
      z-index 1
      left 0
      bottom 0
      padding 4px 6px
      width 100%
      background-color #fdfdfd
      align-items center
      .border-t-1px
        border-t-1px(#999)
      textarea
        width 88%
        resize none
        max-height 60px
        padding 6px
        height 22px
        font-size 16px
        background-color #fff
        border .5px solid #ccc
        border-radius 4px
</style>
