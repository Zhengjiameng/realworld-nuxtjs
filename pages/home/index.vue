<template>
    <div class="home-page">

        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">

                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item"
                                v-if="user">
                                <nuxt-link class="nav-link disabled"
                                           exact
                                           :class="{
                                  'active':tab==='your_feed'
                      }"
                                           :to="{
                                  name:'home',
                                  query:{
                                    tab:'your_feed'
                                  }
                                }">Your Feed
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                        exact
                                        class="nav-link"
                                        :class="{
                                  'active':tab==='global_feed'
                      }"
                                        :to="{
                                  name:'home',
                                  query:{
                                    tab:'global_feed'
                                  }
                                }">Global Feed
                                </nuxt-link>
                            </li>
                            <li class="nav-item"
                                v-if="tag">
                                <nuxt-link
                                        exact
                                        class="nav-link"
                                        :class="{
                                  'active':tab==='tag'
                      }"
                                        :to="{
                                  name:'home',
                                  query:{
                                    tab:'tag',
                                    tag:tag
                                  }
                                }"
                                >#{{tag}}
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview" v-for="(item,index) in this.articles" :key="item.slug">
                        <div class="article-meta">
                            <nuxt-link :to="{
                            name:'profile',
                            params:{
                            username:item.author.username
                            }
                            }">
                                <img :src="item.author.image"/>
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link :to="{
                            name:'profile',
                            params:{
                            username:item.author.username
                            }
                            }">
                                    {{item.author.username}}
                                </nuxt-link>
                                <span class="date">{{item.createdAt|date('MMM DD,YYYY')}}</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm pull-xs-right"
                                    :class="{active:item.favorited}"
                                    :disabled="item.disabled"
                                    @click="onFavorite(item)">
                                <i class="ion-heart"></i> {{item.favoritesCount}}
                            </button>
                        </div>
                        <nuxt-link :to="{
                          name:'article',
                          params:{
                            slug:item.slug
                          }
                        }" class="preview-link">
                            <h1>{{item.title}}</h1>
                            <p>{{item.description}}</p>
                            <span>Read more...</span>
                        </nuxt-link>
                    </div>
                    <nav>
                        <ul class="pagination">

                            <li class="page-item"
                                v-for="item in totalPage" :key="item"
                                :class="{'active':item===page}">
                                <nuxt-link :to="{
                                      name:'home',
                                      query:{
                                        page:item,
                                        tag:$route.query.tag,
                                        tab:$route.query.tab
                                      }
                                    }" class="page-link ng-binding">{{item}}
                                </nuxt-link>


                            </li>

                        </ul>
                    </nav>

                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                            <nuxt-link :to="{
                              name:'home',
                              query:{
                                tag:item,
                                tab:'tag'
                              }

                            }"
                                       class="tag-pill tag-default"
                                       v-for="item in tags"
                                       :key="item"
                                       v-if="item!='&zwnj;'">{{item}}
                            </nuxt-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
  import {getArticles, getTags, getArticlesFeed, addFavorite, deleteFavorite} from '@/utils/articles'
  import {mapState} from 'vuex'
  import axios from 'axios'
  export default {
    name: "HomeIndex",
    watchQuery: ['page', 'tag', 'tab'],
    computed: {
      totalPage() {
        return Math.ceil(this.articlesCount / this.limit)
      },
      ...mapState(['user'])
    },
    async mounted(){
      const data=await axios({
        method: 'get',
        url: 'https://conduit.productionready.io//api/articles',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        },
        timeout: 1000,
      headers:{'Content-Type':'application/x-www-form-urlencoded'}
      });
      console.log(data)
    },
    methods: {
      async onFavorite(article) {
        article.disabled = true

        if (article.favorited) {

          await deleteFavorite(article.slug)
          article.favoritesCount += -1
        } else {
          await addFavorite(article.slug)
          article.favoritesCount += 1
        }
        article.favorited=!article.favorited
        article.disabled = false

      }
    },
    async asyncData({query, store}) {
      const page = Number.parseInt(query.page || 1)
      const limit = 10
      const {tag} = query
      const tab = query.tab || 'global_feed'
      const loadArticles = store.state.user && tab === 'your_feed' ? getArticlesFeed : getArticles
      //无关系的异步操作就可以让他并行执行
      const [articleRes, tagRes] = await Promise.all([
        loadArticles({
          limit,
          offset: (page - 1) * limit,
          tag,
        }),
        getTags()
      ])
      const {articles, articlesCount} = articleRes.data
      const {tags} = tagRes.data
      articles.forEach(article => article.disabled = false)

      return {
        articles,
        articlesCount,
        limit,
        page,
        tags,
        tag,
        tab
      }
    }
  }
</script>

<style scoped>

</style>
