export default {
  shopCartNum(state){
   return state.shopCart.reduce((pre,next)=>{
      return pre + next.count
    },0)
  },

  shopCartPrice(state){
    return state.shopCart.reduce((pre,next)=>{
      return pre + next.price*next.count
    },0)
  },

  ratingsCount(state){
    return state.ratings.length
  },
  positiveRatingsCount(state){
    return state.ratings.reduce((pre,rating)=>{
       return pre+(rating.rateType===0 ? 1:0)
    },0)
  },
  negativeRatingsCount(state,getters){
    return getters.ratingsCount - getters.positiveRatingsCount
  }
}
