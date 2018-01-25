<template>
  <!-- 详细资料 -->
  <div class="detail">
    <we-head :title="headController.title"
             :left-controller="headController.leftController"
             :right-controller="headController.rightController"
             @right-click="onRightClick"></we-head>
    <div class="content-wrapper" v-if="userDetail">
      <scroll>
        <div class="inner">
          <div class="inner-content">
            <div class="head flexbox border-1px border-t-1px">
              <img :src="userDetail.avatar" v-if="userDetail.avatar" />
              <img src="../../assets/images/default_avatar.jpg" v-else />
              <div class="msg">
                <p class="name">
                  <span>{{ userDetail.nikename ? userDetail.nikename : userDetail.phone }}</span>
                  <svg class="icon" :class="{man: userDetail.sex === 1, woman: userDetail.sex === 0}" aria-hidden="true" v-if="userDetail.sex">
                    <use :xlink:href="sexIcon"></use>
                  </svg>
                </p>
              </div>
            </div>
            <div class="weui-cells tag-button">
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                  <p>设置备注和标签</p>
                </div>
                <div class="weui-cell__ft"></div>
              </a>
            </div>
            <div class="weui-cells">
              <div class="weui-cell" v-if="userDetail.address">
                <div class="weui-cell__hd"><label class="weui-label">地区</label></div>
                <div class="weui-cell__bd">
                  <p>{{ userDetail.address }}</p>
                </div>
              </div>
              <div class="weui-cell" v-if="userDetail.signature && !isFriends">
                <div class="weui-cell__hd"><label class="weui-label">个性签名</label></div>
                <div class="weui-cell__bd">
                  <p>{{ userDetail.signature }}</p>
                </div>
              </div>
              <div class="weui-cell" v-if="userDetail.source && !isFriends">
                <div class="weui-cell__hd"><label class="weui-label">来源</label></div>
                <div class="weui-cell__bd">
                  <p>来自{{ userDetail.source }}搜索</p>
                </div>
              </div>
              <a class="weui-cell weui-cell_access" href="javascript:;" v-if="isFriends">
                <div class="weui-cell__bd">
                  <p>更多</p>
                </div>
                <div class="weui-cell__ft"></div>
              </a>
            </div>
            <div class="btn-wrapper">
              <a href="javascript:;" class="weui-btn weui-btn_primary" v-if="!userDetail.detailType && !isFriends" @click="add">添加到通讯录</a>
              <a href="javascript:;" class="weui-btn weui-btn_primary" v-if="isFriends" @click="sendMsg">发消息</a>
              <a href="javascript:;" class="weui-btn weui-btn_primary" v-if="userDetail.detailType === 1 && !isFriends" @click="goAccept">通过验证</a>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <transition name="move-t">
      <send-add-friend v-if="userDetail"
                       v-show="showAdd"
                       :user-id="userDetail.wechat_id"
                       :show="showAdd"
                       :name="user.nikename ? user.nikename : user.phone"
                       @cloes="onCloesSend"></send-add-friend>
    </transition>
    <toast :toast-data="toastData"></toast>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Scroll from 'components/scroll'
  import headConfig from 'config/index_head'
  import Utils from 'utils/util'
  import SendAddFriend from 'components/send_add_friend'

  export default {
    name: 'user-detail',
    activated () {
      this.dontRefresh()
    },
    data () {
      return {
        userDetail: null, // 搜索出来的用户
        showAdd: false, // 打开发送请求组件
        toastData: {
          show: false,
          type: 'loading',
          text: '请稍后...'
        }
      }
    },
    computed: {
      ...mapGetters(['user', 'friends', 'rooms']),
      headController () { // 头部配置
        return headConfig['/userdetail']
      },
      sexIcon () { // 性别
        return this.userDetail.sex === 1 ? '#icon-iconfontnan' : '#icon-woman'
      },
      isFriends () {
        const index = this.friends.findIndex(a => a.wechat_id === this.userDetail.wechat_id)
        if (index !== -1) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      ...mapActions(['accept', 'updateMsg']),
      async dontRefresh () { // 防止刷新或无数据
        const data = Utils.getSession('user_detail')
        if (!data) {
          // 延时退出
          await Utils.delay(400)
          this.$router.go(-1)
        } else {
          this.userDetail = data
        }
      },
      init () {
        const data = Utils.getSession('user_detail')
        this.userDetail = data
        const friends = Utils.getLocal('friends')
        const index = friends.findIndex(a => a.wechat_id === this.userDetail.wechat_id)
        if (index !== -1) {
          this.isFriends = true
        } else {
          this.isFriends = false
        }
      },
      onRightClick () { // 返回按钮点击执行
        console.log('进入资料设置')
      },
      add () { // 开启添加朋友
        this.showAdd = true
      },
      onCloesSend () {
        this.showAdd = false
      },
      async goAccept () { // 通过好友请求验证
        const fromObj = {
          address: this.userDetail.address,
          avatar: this.userDetail.avatar,
          customizeId: this.userDetail.customizeId,
          nikename: this.userDetail.nikename,
          phone: this.userDetail.phone,
          sex: this.userDetail.sex,
          signature: this.userDetail.signature,
          wechat_id: this.userDetail.wechat_id,
          remark: ''
        }
        this.toastData.show = true
        await Utils.delay()
        const res = await this.accept(fromObj)
        if (res.code === 1) {
          this.toastData.type = 'success'
          this.toastData.text = '添加成功'
          this.updateMsg(res.data)
          await Utils.delay(400)
        } else {
          alert(res.msg)
        }
        this.toastData = {
          show: false,
          type: 'loading',
          text: '请稍后...'
        }
      },
      sendMsg () {
        let room = this.rooms.find(o => o.users.wechat_id === this.userDetail.wechat_id)
        if (!room) {
          room = { roomId: '0' }
        }
        this.$router.push({
          path: `${this.$route.path}/chat`,
          query: {
            roomId: room.roomId,
            userId: room.roomId === '0' ? this.userDetail.wechat_id : ''
          }
        })
      }
    },
    components: {
      Scroll,
      SendAddFriend
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"
  .detail
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-color $bg-color
    .content-wrapper
      position absolute
      top 50px
      right 0
      bottom 0
      left 0
      .inner
        min-height calc(100vh - 49px)
        overflow hidden
        .inner-content
          .head
            margin-top 10px
            padding 8px 4%
            background-color #fff
            align-items center
            border-1px(#e5e5e5)
            border-t-1px(#e5e5e5)
            img
              width 45px
              height 45px
              margin-right 10px
            .msg
              .name
                .man
                  color #09f
                .woman
                  color #f68
          .tag-button
            margin 15px 0
          .btn-wrapper
            margin 15px 4%


</style>
