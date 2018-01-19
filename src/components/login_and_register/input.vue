<template>
  <div class="input-wrapper">
    <h2>{{ myInputData.title }}</h2>
    <router-link tag="a" class="weui-cell_link login" :to="myInputData.rightBtnPath">{{ myInputData.rightBtnTxt }}</router-link>
    <div class="">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">账号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" placeholder="请输入手机号" @blur="onblur" v-model="myInputData.phone" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="password" placeholder="请输入密码" @blur="onblur" v-model="myInputData.password" />
        </div>
      </div>
      <div class="weui-cell" v-if="myInputData.type === 2">
        <div class="weui-cell__hd"><label class="weui-label">确认密码</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="password" placeholder="请再次输入密码" @blur="onblur" v-model="myInputData.repeatPassword" />
        </div>
      </div>
      <div class="weui-cell"></div>
      <a href="javascript:;"
         class="weui-btn weui-btn_primary"
         :class="{'weui-btn_disabled': !isSubmit || !isSubmit2}"
         @click="submit">{{ myInputData.submitTxt }}</a>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'input-wrapper',
    props: {
      myInputData: { // 包含标题,右上角按钮内容和跳转路径,手机号和密码,提交按钮内容,是否可提交
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        isSubmit: false
      }
    },
    computed: {
      isSubmit2 () {
        if (this.myInputData.phone === '') {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      submit () {
        if (this.validate()) {
          this.$emit('submit')
        }
      },
      validate () {
        if (this.myInputData.phone === '') {
          return false
        }
        if (this.myInputData.password === '') {
          return false
        }
        if (this.myInputData.type === 2 && this.myInputData.repeatPassword === '') {
          return false
        }
        if (this.myInputData.type === 2 && this.myInputData.repeatPassword !== this.myInputData.password) {
          return false
        }
        return true
      },
      onblur () {
        this.isSubmit = this.validate()
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .input-wrapper
    .weui-cell:before
      left 0
    .login
      position fixed
      top 0
      right 0
      padding 14px
      font-size 16px
    .weui-btn
      margin-top 5%
    h2
      font-weight 400
      text-align center
      margin 10% auto
</style>
