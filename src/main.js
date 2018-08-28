import Vue from 'vue'
import App from './App.vue'

import router from './router'

// 注册全局组件标签
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
Vue.component('HeaderTop', HeaderTop)

export default new Vue({
  el:'#app',
  render: h =>h(App),
  router
})
