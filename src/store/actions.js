import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS} from "./mutation-types";

import {
  reqAddress,
  reqCategorys,
  reqShops
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
  }
}
