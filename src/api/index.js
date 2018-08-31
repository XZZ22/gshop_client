import ajax from './ajax'

const BASE = '/api'
//1、根据经纬度获取位置详情
export const reqAddress = (geohash)=>ajax(`${BASE}/position/${geohash}`)
//2、获取食品分类列表
export const reqCategorys = ()=>ajax(`${BASE}/index_category`)
//3、根据经纬度获取商铺列表
export const reqShops =(latitude,longitude)=>ajax(BASE + '/shops',{latitude,longitude})
/**
 * 账号密码登录
 */
export const reqPwdLogin = ({name, pwd, captcha}) => ajax('/api/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')

/**
 * 获取短信验证码
 */
export const reqSendCode = phone => ajax('/api/sendcode', {phone})

/**
 * 手机号验证码登录
 */
export const reqMsgLogin = (phone, code) => ajax('/api/login_sms', {phone, code}, 'POST')

/**
 * 获取用户信息(根据会话)
 */
export const reqUser = () => ajax('/api/userinfo')

export const resetUser = () =>ajax('/api/logout')

/*
以下是用mock模拟的接口数据
 */
/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
