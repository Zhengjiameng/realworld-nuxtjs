<template>
    <div>
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
    </div>
</template>
<script>
  import {addFavorite, deleteFavorite} from '@/utils/articles'
    export default {
      name:'ArticleInfo',
      props:{
        articles:{
          type:Array,
          required:true
        },

      },
      methods:{
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
      }
    }
</script>
