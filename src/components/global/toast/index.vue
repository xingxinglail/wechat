<template>
  <transition name="fade">
    <div class="toast" v-show="toastData.show">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast" v-if="toastData.type === 'success'"></i>
        <i class="weui-loading weui-icon_toast" v-else></i>
        <p class="weui-toast__content">{{ toastData.text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'toast',
    props: {
      toastData: { // 包含是否显示隐藏,类型,文本
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>

</style>
