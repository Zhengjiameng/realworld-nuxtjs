<template>
    <div class="profile-page">

        <div class="user-info">
            <div class="container">
                <div class="row">

                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="userInfo.image" class="user-img"/>
                        <h4>{{userInfo.username}}</h4>
                        <p>
                            {{userInfo.bio}}
                        </p>
                        <button class="btn btn-sm btn-outline-secondary action-btn" @click="followUser">
                            <i class="ion-plus-round"></i>
                            &nbsp;
                            {{userInfo.following?'unFollow':'Follow'}} {{userInfo.username}}
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <nuxt-link class="nav-link"
                                           exact
                                :class="{active:tag=='0'}"
                                :to="{
                                  name:'profile',
                                  query:{
                                    tag:0
                                  }
                                }"
                                >My Articles</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link"
                                           exact
                                           :class="{active:tag==1}"
                                :to="{
                                  name:'profile',
                                  query:{
                                    tag:1
                                  }
                                }">Favorited Articles</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <ArticleInfo :articles="articles" :totalPage="totalPage"></ArticleInfo>
<!--                    <div class="article-preview">-->
<!--                        <div class="article-meta">-->
<!--                            <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg"/></a>-->
<!--                            <div class="info">-->
<!--                                <a href="" class="author">Albert Pai</a>-->
<!--                                <span class="date">January 20th</span>-->
<!--                            </div>-->
<!--                            <button class="btn btn-outline-primary btn-sm pull-xs-right">-->
<!--                                <i class="ion-heart"></i> 32-->
<!--                            </button>-->
<!--                        </div>-->
<!--                        <a href="" class="preview-link">-->
<!--                            <h1>The song you won't ever stop singing. No matter how hard you try.</h1>-->
<!--                            <p>This is the description for the post.</p>-->
<!--                            <span>Read more...</span>-->
<!--                            <ul class="tag-list">-->
<!--                                <li class="tag-default tag-pill tag-outline">Music</li>-->
<!--                                <li class="tag-default tag-pill tag-outline">Song</li>-->
<!--                            </ul>-->
<!--                        </a>-->
<!--                    </div>-->


                </div>

            </div>
        </div>

    </div>

</template>

<script>
  import {getUserInfo,addFollow,cancelFollow}from '@/utils/user'
  import {getArticles} from '@/utils/articles'
  import ArticleInfo from '@/pages/article/components/article-info'
  export default {
    name: "ProfileIndex",
    middleware:'authenticated',
    watchQuery: ['tag'],
    data(){
      return {
        userInfo:{},
        articles:[],
        articlesCount:0,
        limit:10,
        username:this.$route.params.username,
        tag:this.$route.query.tag||0
      }
    },
    computed: {
      totalPage() {
        return Math.ceil(this.articlesCount / this.limit)
      },
    },
    async asyncData({params,query}){
      const tag=query.tag?query.tag:'0'
      const {data}=await getArticles({
        author:tag==0?params.username:'',
        favorited:tag==1?params.username:'',
        limit:20,
        offset:0
      })
      const userInfo=await getUserInfo(params.username)
      return {
        articles:data.articles,
        articlesCount:data.articlesCount,
            userInfo:userInfo.data.profile

      }
    },
    async mounted(){
      this.getInfo()
    },
    methods:{
      async getInfo(){
        const {data}=await getUserInfo(this.$route.params.username)
        this.userInfo=data.profile
      },
      async followUser(){
        if(!this.userInfo.following){
          const {data}=await  addFollow(this.userInfo.username)
          this.userInfo=data.profile
        }else{
          const {data}=await cancelFollow(this.userInfo.username)
          this.userInfo=data.profile
        }

      },
    },
    components:{
      ArticleInfo
    }
  }
</script>

<style scoped>

</style>
