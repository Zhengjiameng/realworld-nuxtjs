<template>
    <div class="article-meta">
        <nuxt-link
                :to="{
          name:'profile',
          params:{
            username:acticle.author.username
          }
            }"

        ><img :src="acticle.author.image"/></nuxt-link>
        <div class="info">
            <nuxt-link
                    :to="{
          name:'profile',
          params:{
            username:acticle.author.username
          }
            }"
                    class="author">{{acticle.author.username}}
            </nuxt-link>
            <span class="date">{{acticle.createdAt|date('MMM DD,YYYY')}}</span>
        </div>

        <button class="btn btn-sm btn-outline-secondary"
        :class="{
          'active':acticle.author.following
        }"
        >
            <i class="ion-plus-round"></i>
            Follow Eric Simons <span class="counter">(10)</span>
        </button>
        &nbsp;
        <button class="btn btn-sm btn-outline-primary"
                :class="{
          'active':acticle.favorited
        }">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">(29)</span>
        </button>
    </div>
</template>
<script>
  export default {
    name: 'ArticleMeta',
    props: {
      acticle: {
        type: Object,
        default: {}
      }
    }
  }
</script>
