import axios from "axios"
  //https://conduit.productionready.io/

const request=axios.create({
  baseURL:'https://conduit.productionready.io/'
})
//请求拦截器
// 拦截器的添加
request.interceptors.request.use(config => {
  // 发起请求前做些什么
  //返回config 请求配置对象
  return config
}, (error) => {
  // 请求错误 此时请求还没有发出去
})
//响应拦截器
export default request
