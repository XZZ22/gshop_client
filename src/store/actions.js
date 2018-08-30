import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,RECEIVE_USER,RESET_USER} from "./mutation-types";

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUser,
  resetUser
} from "../api";

export default {

  async getAddress({commit,state}){
    const geohash  = state.latitude + ',' + state.longitude
    //发送ajax请求
    const result = await reqAddress(geohash)
    const address = result.data
    commit(RECEIVE_ADDRESS,{address})
  },

  async getCategorys({commit}){
    const result = await reqCategorys()
    const categorys = result.data
    commit(RECEIVE_CATEGORYS,{categorys})
  },

  async getShops({commit,state}){
    const latitude  = state.latitude
    const longitude = state.longitude
    //发送ajax请求
    const result = await reqShops({latitude,longitude})
    const shops = result.data
    commit(RECEIVE_SHOPS,{shops})
  },

  //同步保存用户信息
  saveUser({commit},{user}){
    commit(RECEIVE_USER,{user})
  },

  //异步获取用户
  async getUser({commit}){
    const result = await reqUser()
    if(result.code ===0){
      const user = result.data
      commit(RECEIVE_USER,{user})
    }
  },

  //退出，同步
  async loginOut({commit}){
    const result = await resetUser()
    if(result.code === 0){
      commit(RESET_USER)
    }
  }
}
