import axios from "axios"
//https://conduit.productionready.io/
//创建请求对象
export const request=axios.create({
  baseURL:'https://conduit.productionready.io/',
  'Content-Type':'application/x-www-form-urlencoded'
})
//插件导出必须作为default导出
//通过插件机制获取到上下文对象 （query,params,store）
export default ({store})=>{
  //请求拦截器
// 拦截器的添加
  request.interceptors.request.use(config => {
    // 发起请求前做些什么
    const {user}=store.state
    if(user&&user.token){
      config.headers.Authorization= `Token ${user.token}`
    }
    console.log(config)
    //返回config 请求配置对象
    return config
  }, (error) => {
    // 请求错误 此时请求还没有发出去
  })
}

