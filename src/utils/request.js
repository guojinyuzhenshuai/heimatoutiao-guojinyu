// 对axios进行一个封装
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint' // 引入第三方的包
// 请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
// 请求拦截 拦截请求头 request 传入config , config 是axios 的所有配置
axios.interceptors.request.use(function (config) {
  // 这个函数有两个参数
  // console.log(axios.interceptors)
  // 执行请求ok

  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  // 将 token 当做一个属性放人 config中 当config再次返回时  就会携带token 从而使请求成功

  return config// 如果返回config 它就会作为新的请求选项去进行请求
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
// 后台数据 到达 响应拦截之前走的一个函数
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]
// 响应拦截
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}// 解决当data不存在时 then中读取数据报错问题
}, function (error) {
  console.log(error)
  //   console.log(response)
  // 失败进入第二个回调函数, 所有的失败都会进到第二个回调函数
  // 失败时执行 状态码 不是200 或者201/204
  // 获取状态码 => 根据状态码 进行相应的提示或者操作
  let status = error.response.status
  //   let configurl = error.request.url // 请求地址
  let message = ''
  switch (status) {
    case 400:
      message = '手机号或者验证码错误'
      break
    case 403 :
      // 如果同样的状态码 但是不同意思 => 需要通过 请求地址来判断是哪个响应 请求地址 + 状态码 一起来判断 怎么处理
      message = 'refresh_token未携带或已过期'
      // 跳转到登录页
      router.push('./login')
      break
    case 401 :
      // 跳转到登录页
      message = 'token过期或未传'
      router.push('./login')
      break
    case 404 :
      message = '手机号不正确'
      break
    case 507 :
      message = '服务器数据异常s'
      break
    default:
      break
  }

  Message({ type: 'warning', message }) // 提示信息
  // 想让错我进入到catch中而不进入then中
  return Promise.reject(error)
})
export default axios
