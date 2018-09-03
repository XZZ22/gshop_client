#day01

##主要内容：静态页面的实现

一、html静态页面：
1) 图片Base64: 样式中引用的小图片, 在webpack打包会自动处理转换为样式内部的Base64编码字符串
2) 2x与3x图: 不同手机的屏幕密度不一样, 一般都在2以上(如iphone6为2,iphone6s为3), 为了适配不同的手机, UI设计师为同一个图片制作了2x和3x的2套图片(图形一样, 但大小不一样)
3）1px像素的实现
4）清除浮动


二、字体库的引用： iconfont字体图标
	a. 目前国内用的最多的是阿里巴巴矢量库（http://www.iconfont.cn/）

三、语法检查：eslint,jslint,jshint


四、移动端

1) viewport

	<meta name="viewport"
	  content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">

2)解决点击响应延时0.2s问题

	<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
	<script>
	  if ('addEventListener' in document) {
	    document.addEventListener('DOMContentLoaded', function() {
	      FastClick.attach(document.body);
	    }, false);
	  }
	  if(!window.Promise) {
	    document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
	  }
	</script>

五、实现底部导航     ----vue-router的使用

	说明：
	1) 通过编程式导航实现路由的切换显示($router)
	2) 通过动态class和$route.path来实现tab样式切换
	3) 通过阿里图标库, 显示导航图标
	通过判断$route.path 的路径名称，判断当前的class属性on是否显示。
	点击事件：@click='goto(path)'  ，methods：{goto（path）{}}

六、Msite组件等四个路由组件的静态实现

七、使用swiper实现图片轮播

	地址: http://www.swiper.com.cn/
	下载: npm install --save swiper
	<script>
	  import Swiper from 'swiper'
	  import 'swiper/dist/css/swiper.min.css'
	  export default {
	    mounted () {
	      new Swiper('.swiper-container', {
	        pagination: {
	          el: '.swiper-pagination',
	        },
	        loop: true
	      })
	    }
	  }
	</script>
八、抽取HeaderTop组件 -----主要为了使用slot

九、抽取ShopList组件(静态)

十、定义Login组件(静态)，配置路由

十一、控制Footer的显示隐藏 ----路由中的meta属性

	使用：
	1) App.vue
	<FooterGuide v-show="$route.meta.showFooter"></FooterGuide>


##主要内容：后台接口的实现

一、接口文档

	目录：
	[1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
	[2、获取食品分类列表](#2获取食品分类列表)<br/>
	[3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
	[4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
	[5、获取一次性验证码](#5获取一次性验证码)<br/>
	[6、用户名密码登陆](#6用户名密码登陆)<br/>
	[7、发送短信验证码](#7发送短信验证码)<br/>
	[8、手机号验证码登陆](#8手机号验证码登陆)<br/>
	[9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
	[10、用户登出](#10用户登出)<br/>

二、使用vuex管理状态
	npm install --save vuex

 # day02

## 登陆/注册功能
### 1. 前台交互效果

      1). 切换登陆方式
      2). 手机号验证
        注意点：form表单提交，默认行为禁止.prevent
      3). 倒计时效果
      4). 密码的显示/隐藏切换
        input中的type类型---div的on---div的right---span中内容切换为abc

### 2. 前后台交互效果
      1). 一次性图形验证码
        注意:不用发送ajax请求，直接在src中添加地址
      2). 发送一次性短信验证码
      3). 短信登陆
      4). 密码登陆
        注意：
          1、以上两次返回的结果，统一处理
          2、无论登录成功与否都要停止计时
          结果：
            成功：获取用户信息---保存在state中----跳转路由
            失败：给一个提示结果
      5). 自动登陆
      6). 退出登陆

#day03
##1、更新登录状态
      5). 自动登陆
        App.vue中分发获取用户的异步action，由mutation直接获取
      6). 退出登陆
        由于这次缓存的用户信息存放在session中，所以退出登录清除用户信息需要发送ajax请求
        如果是保存在cookie中，则不需要发送ajax请求

##2、Shop组件
    shopGoods/shopInfo/shopRaings ---> 设置路由

##3、利用mockjs模拟数据
    (1)mockjs：生成随机数据，拦截ajax请求
    (2)json数据是什么？
        是一种用来存储结构化数据的文本数据结构
        优点：小巧，可以轻松与js交互
        整体类型：
            json对象: {}, 与js对象对应
        		json数组: []  与js数组对应
        组成：
            结构：类型与名称
            值
        模拟json数据
            与真实的json数据在结构上要相同，但是值可以不同

#day04
1、route-link的路由跳转中，默认的to中设置的路由是push，可以改成replace
2、获取商家信息info
  (1)v-if : 如果内容还没存在，可以不解析，如果解析了，会出现bug --- 相比于v-show的优势
    问题何时会出现？ --- 三层表达式解析的时候
  (2)swiper -- 滑动库
      利用callback和$nextTick实现在列表显示之后进行滑动
      在action中传入cb ，cb && cb()    ---现在不执行，后面才会执行
      mounted:初始化
      $nextTick：状态改变时

      注意：ref --- 标识，相当于id



