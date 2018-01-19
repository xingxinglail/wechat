// 首页头部数据配置
const headConfig = {
  '/message': { // 消息列表页
    leftController: { show: false },
    rightController: {
      show: true,
      icon: '#icon-jia'
    },
    title: '微信'
  },
  '/address': { // 通讯录页
    leftController: { show: false },
    rightController: {
      show: true,
      icon: '#icon-icon'
    },
    title: '通讯录'
  },
  '/discovery': { // 发现页
    leftController: { show: false },
    rightController: { show: false },
    title: '发现'
  },
  '/user': { // 用户的页
    leftController: { show: false },
    rightController: { show: false },
    title: '我'
  },
  '/addfriend': {
    leftController: { show: true },
    rightController: { show: false },
    title: '添加朋友'
  },
  '/userdetail': {
    leftController: {
      show: true
    },
    rightController: {
      show: true,
      icon: '#icon-gengduo'
    },
    title: '详细资料'
  },
  'send-add-friend': {
    leftController: {
      show: true,
      txt: '取消',
      noBack: true
    },
    rightController: {
      show: true,
      html: '<span>发送</span>'
    },
    title: '朋友验证'
  },
  '/newfriend': {
    leftController: {
      show: true
    },
    rightController: {
      show: true,
      html: '<span style="color: #fff;">添加朋友</span>'
    },
    title: '新的朋友'
  },
  '/chat': {
    leftController: {
      show: true
    },
    rightController: {
      show: true,
      icon: '#icon-woon2x-copy'
    }
  }
}

export default headConfig
