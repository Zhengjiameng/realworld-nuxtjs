import {request} from "@/plugins/request";
// import request from "@/utils/request";
//获取文章列表
export const getArticles=data=>{
  console.log(data)
  return request({
    method:'get',
    url:'/api/articles',
    params:data
  })
}

export const getTags=data=>{
  return request({
    method:'GET',
    url:'/api/tags',
     params:data
  })
}
//获取关注的用户文章列表
export const getArticlesFeed=data=>{
  return request({
    method:'GET',
    url:'/api/articles/feed',
     params:data

  })
}
//添加点赞
export const addFavorite=slug=>{
  return request({
    method:'POST',
    url:`/api/articles/${slug}/favorite`,


  })
}
export const deleteFavorite=slug=>{
  return request({
    method:'DELETE',
    url:`/api/articles/${slug}/favorite`,
  })
}
export const getArticle=slug=>{
  return request({
    method:'GET',
    url:`/api/articles/${slug}`,
  })
}
export const getComments=slug=>{
  return request({
    method:'GET',
    url:`/api/articles/${slug}/comments`,
  })
}
//创建文章
export const createArticle=(data)=>{
  return request({
    method:'POST',
    url:`/api/articles`,
    data
  })
}//创建文章
export const submitComments=(slug,data)=>{
  return request({
    method:'POST',
    url:`/api/articles/${slug}/comments`,
    data
  })
}

