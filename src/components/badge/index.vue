<template>
  <div class="badge" v-if="count > 0">{{ nowCount }}</div>
</template>

<script>
  export default {
    name: 'badge',
    props: {
      count: {
        type: Number
      }
    },
    computed: {
      nowCount () {
        return this.count > 99 ? '99+' : this.count
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .badge
    background-color #F43530
    border-radius 10px
    color #fff
    font-size 12px
    height 16px
    line-height 16px
    padding 0 4.7px
    text-align: center
    white-space nowrap
</style>
