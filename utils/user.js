import {request} from "@/plugins/request";
//用户登录
export const login=data=>{
  return request({
    method:'POST',
    url:'/api/users/login',
    data
  })
}
//注册
export const register=data=>{
  return request({
    method:'POST',
    url:'/api/users',
    data
  })
}
export const updateUser=data=>{
  return request({
    method:'put',
    url:'/api/user',
    data
  })
}
//获取用户信息
export const getUserInfo=username=>{
  return request({
    method:'get',
    url:`/api/profiles/${
        username
    }`,
  })
}//获取用户信息
export const addFollow=username=>{
  return request({
    method:'POST',
    url:`/api/profiles/${username}/follow`,
  })
}
export const cancelFollow=username=>{
  return request({
    method:'Delete',
    url:`/api/profiles/${username}/follow`,
  })
}
