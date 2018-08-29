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
