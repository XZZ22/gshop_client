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

import Vue from 'vue'

export default {

  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USER](state,{user}){
    state.user = user
  },
  [RESET_USER](state){
    state.user ={}
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){
      Vue.set(food,'count',1)
      state.shopCart.push(food)
    }else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count--
      if(food.count === 0){
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }
    }
  },

  [CLEAR_CART](state){
    //foodzhong中的也要清空
    state.shopCart.forEach(food=>{
      food.count = 0
    })
    state.shopCart = []
  }
}
