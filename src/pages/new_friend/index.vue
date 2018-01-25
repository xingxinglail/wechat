<template>
  <div class="new-friend absolute">
    <we-head :title="headController.title"
             :left-controller="headController.leftController"
             :right-controller="headController.rightController"></we-head>
    <div class="content-wrapper absolute">
      <scroll>
        <div class="inner">
          <div class="weui-search-bar">
            <form class="weui-search-bar__form">
              <div class="weui-search-bar__box">
                <i class="weui-icon-search"></i>
                <input type="search" class="weui-search-bar__input"placeholder="搜索" disabled />
              </div>
              <label class="weui-search-bar__label">
                <i class="weui-icon-search"></i>
                <span>搜索</span>
              </label>
            </form>
          </div>
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access"
               href="javascript:;"
               v-for="(item, index) in addFriendMsg"
               :key="index" @click="goDetail(item)">
              <div class="weui-cell__hd">
                <img class="avatar" v-if="item.avatar" :src="item.avatar" />
                <img class="avatar" v-else src="../../assets/images/default_avatar.jpg" alt="">
              </div>
              <div class="weui-cell__bd">
                <p class="name">{{ item.nikename ? item.nikename : item.phone }}</p>
                <p class="msg">{{ item.message ? item.message : '请求添加你为朋友' }}</p>
              </div>
              <div class="weui-cell__ft" v-if="item.success === 0" @click.stop="add(item)">添加</div>
              <div class="weui-cell__ft success" v-else>已添加</div>
            </a>
          </div>
        </div>
      </scroll>
    </div>
    <toast :toast-data="toastData"></toast>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Scroll from 'components/scroll'
  import headConfig from 'config/index_head'
  import Utils from 'utils/util'

  export default {
    name: 'new-friend',
    data () {
      return {
        toastData: {
          show: false,
          type: 'loading',
          text: '请稍后...'
        }
      }
    },
    activated () {
      this.init()
    },
    methods: {
      ...mapActions(['setAddFriendMsgRead', 'accept', 'updateMsg']),
      async init () { // 判断是否有未读消息,如果有就发送请求
        const item = this.addFriendMsg.find(o => o.isRead === 0)
        if (item) {
          await Utils.delay(400)
          this.setAddFriendMsgRead(this.user.wechat_id)
        }
      },
      goDetail (user) {
        user.detailType = 1
        Utils.setSession('user_detail', user)
        this.$router.push('/address/newfriend/userdetail')
      },
      async add (item) {
        const fromObj = {
          address: item.address,
          avatar: item.avatar,
          customizeId: item.customizeId,
          nikename: item.nikename,
          phone: item.phone,
          sex: item.sex,
          signature: item.signature,
          wechat_id: item.wechat_id,
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
      }
    },
    computed: {
      ...mapGetters(['addFriendMsg', 'user']),
      headController () { // 头部配置
        return headConfig['/newfriend']
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/variable.styl"

  .new-friend
    background-color $bg-color
    .content-wrapper
      top 50px
      .inner
        min-height calc(100vh - 49px)
        .weui-cells
          img.avatar
            width 38px
            height 38px
            margin-right 8px
          .weui-cell__bd
            p.msg
              font-size 12px
              color #999
          .weui-cell__ft
            background-color $color
            color #fff
            font-size 12px
            padding 0
            width 40px
            height 26px
            line-height 26px
            text-align center
            border-radius 3px
            &.success
              background-color transparent
              color #999
            &:after
              display none
</style>
