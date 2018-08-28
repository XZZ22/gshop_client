<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  //测试
  // import {reqSendcode} from './api'
  export default {
    // async mounted(){
    //   const result = await reqSendcode(15231627695)
    //   console.log(result)
    // },
    components:{
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
