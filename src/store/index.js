/*
store最核心的管理模块
 */

import Vue from 'vue'
import Vuex from 'vuex'

//引入四个模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//使用
Vue.use(Vuex)
//暴露
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
