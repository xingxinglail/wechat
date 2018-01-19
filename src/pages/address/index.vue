<template>
  <IndexWrapper>
    <div class="address">
      <div class="content pos">
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
        <div class="nav">
          <div class="weui-cells">
            <router-link tag="a"
                         class="weui-cell weui-cell_access"
                         :to="{path: '/address/newfriend', query: {source: '通讯录'}}">
              <div v-if="moreItem.length > 0" class="has-new-friend">
                <div class="badge-wrapper">
                  <badge :count="moreItem.length"></badge>
                </div>
                <p class="title">新的朋友</p>
                <div class="one flexbox" v-if="moreItem.length === 1">
                  <img class="avatar" v-if="oneItem.avatar" :src="oneItem.avatar" />
                  <img class="avatar" v-else src="../../assets/images/default_avatar.jpg" />
                  <div class="msg flexbox">
                    <p class="name">{{ oneItem.nikename ? oneItem.nikename : oneItem.phone }}</p>
                    <p class="message">{{ oneItem.message ? oneItem.message : '请求添加你为朋友' }}</p>
                  </div>
                </div>
                <div class="more flexbox" v-else>
                  <div v-for="(item, index) in moreItem" :key="index">
                    <img class="avatar" v-if="item.avatar" :src="item.avatar" />
                    <img class="avatar" v-else src="../../assets/images/default_avatar.jpg" />
                  </div>
                </div>
              </div>
              <div v-else class="flexbox no-new-friend">
                <div class="weui-cell__hd icon-wrapper newfriend">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tianjiayonghu"></use>
                  </svg>
                </div>
                <div class="weui-cell__bd">
                  <p>新的朋友</p>
                </div>
              </div>
            </router-link>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__hd icon-wrapper groupchat">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yonghuming"></use>
                </svg>
              </div>
              <div class="weui-cell__bd">
                <p>群聊</p>
              </div>
            </a>
          </div>
        </div>
        <div class="friend-list">
          <ul>
            <li v-for="(item, index) in friends" :key="index" @click="goDetail(item)">
              {{ item.remark ? item.remark : item.nikename ? item.nikename : item.phone}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </IndexWrapper>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Badge from 'components/badge'
  import IndexWrapper from 'components/index_wrapper'
  import Utils from 'utils/util'

  export default {
    name: 'address-book',
    data () {
      return {
        tab: 'address',
        showMenu: false // 控制消息列表页右上角菜单
      }
    },
    computed: {
      ...mapGetters(['addFriendMsg', 'friends']),
      oneItem () {
        if (this.moreItem.length === 1) {
          return this.addFriendMsg.find(o => o.isRead === 0)
        }
      },
      moreItem () {
        return this.addFriendMsg.filter(o => o.isRead === 0)
      }
    },
    methods: {
      goDetail (item) {
        Utils.setSession('user_detail', item)
        this.$router.push({
          path: '/address/userdetail',
          query: {
            source: '通讯录'
          }
        })
      }
    },
    components: {
      IndexWrapper,
      Badge
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/mixin.styl"
  @import "~assets/stylus/variable.styl"

  .address
    min-height calc(100vh - 94px)
    overflow hidden
    .nav
      .weui-cells
        margin-top 0
        .no-new-friend
          align-items center
        .has-new-friend
          position relative
          padding-right 30px
          width 100%
          overflow hidden
          .badge-wrapper
            position absolute
            top 18px
            right 0
          p.title
            font-size 10px
            color #999
          img.avatar
            width 45px
            height 45px
            border-radius 3px
            margin-right 10px
          .one
            .msg
              flex-direction column
              justify-content center
              p.name
                font-size 14px
                margin-bottom 6px
              p.message
                font-size 12px
                color #999
          .more
            overflow hidden
        .icon-wrapper
          width 35px
          height 35px
          text-align center
          line-height 40px
          margin-right 10px
          .icon
            color #fff
            font-size 20px
          &.newfriend
            background-color #f69c3a
          &.groupchat
            background-color $color
</style>
