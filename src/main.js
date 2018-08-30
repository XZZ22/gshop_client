import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store/index'

// 注册全局组件标签
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
import {Button} from 'mint-ui'

Vue.component('HeaderTop', HeaderTop)
Vue.component(Button.name, Button)

import './mock/mockServer'

export default new Vue({
  el:'#app',
  render: h =>h(App),
  router,
  store
})
