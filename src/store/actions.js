import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from "./mutation-types";

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUser,
  resetUser,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings
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
  },

  //异步获取商品信息
  async getShopGoods({commit},cd){
    const result = await reqShopGoods()
    if(result.code ===0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
    }
    cd &&cd()
  },

  //异步获取商家信息
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code ===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  },

  //异步获取评分信息
  async getShopRatings({commit},cb){
    const result = await reqShopRatings()
    if(result.code ===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
    }
    cb && cb()
  },

  async updateFoodCount({commit},{food,isAdd}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },



  //同步清空列表中的数据
  clearCart({commit}){
    commit(CLEAR_CART)
  }
}
