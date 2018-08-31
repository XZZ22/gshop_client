<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
          :class="{current:currentIndex===index}" @click="selectItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /*
1. 滑动右侧列表, 左侧的当前分类变化
2. 点击左侧分类项, 右侧列表滑动到对应位置
3. 如何保证当前分类可见
    当前分类的下标: currentIndex
    右侧列表滑动的Y坐标: scrollY-->滑动过程中动态确定(绑定scroll监听)
    右侧所有分类li的top值: tops-->列表初始显示后读取
    计算的逻辑: scrollY>=top && scrollY<nextTop
 */

  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl.vue'

  export default {
    data() {
      return {
        scrollY:'',
        tops:[]
      }
    },

    mounted(){
      this.$store.dispatch('getShopGoods',()=>{
        this.$nextTick(()=>{
          this._initScroll()
          this._initTops()
        })
      })
    },
    computed:{
      ...mapState(['goods']),

      currentIndex(){
        const {scrollY ,tops} = this
        // [0, 12, 15, 18]
        // scrollY>=top && scrollY<nextTop    [top, nextTop)

        const index = tops.findIndex((top,index)=>scrollY>=top && scrollY<tops[index+1])

        //index和当前的不相同，才改变
        if(index !== BScroll.index){
          BScroll.index = index
          console.log('111')
          this._scrollLeftList(index)
        }
        return index
      }
    },
    methods:{
      _initScroll(){
        //给左右两边绑定scroll监听，通过监听，检测scrollY得值，
        this.leftScroll = new BScroll('.menu-wrapper',{
          click:true
        })
        this.rightScroll = new BScroll('.foods-wrapper',{
          click:true,
          probeType:1
        })

        // 给右侧列表绑定scroll监听
        this.rightScroll.on('scroll',({x,y})=>{
          console.log('scroll',x,y)
          this.scrollY = Math.abs(y)
        })
        // 给右侧列表绑定scrollEnd监听
        this.rightScroll.on('scrollEnd',({x,y})=>{
          console.log('scrollEnd',x,y)
          this.scrollY = Math.abs(y)
        })

      },
      //通过获取每一个li得高度，得到top得值
      _initTops(){
        const tops = []
        let top = 0;
        tops.push(top)

        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        Array.from(lis).forEach(li=>{
          top += li.clientHeight
          tops.push(top)
        })

        this.tops = tops
        console.log(tops)
      },

      //点击左侧得分类，跳转到指定得右侧分类列表上
      selectItem(index){
        //获取当前得top
        const top = this.tops[index]

        //立即更新scrollY得值
        this.scrollY = top

        //平滑得滑动到对应的位置
        this.rightScroll.scrollTo(0,-top,300)
      },


      //功能性bug，右侧滑动到底部的时候，左侧的分类对应类看不见
      _scrollLeftList(index){
        if(this.leftScroll){
          const li = this.$refs.leftUl.children[index]
          console.log('222')
          //滑动到指定的元素
          this.leftScroll.scrollToElement(li,200)
        }
      }
    },

    components:{
      CartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 220px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        /*padding-bottom: 18px*/
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
            .rating
              float right
              margin-top -8px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
