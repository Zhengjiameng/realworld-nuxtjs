<template>
    <div class="article-page">

        <div class="banner">
            <div class="container">

                <h1>{{article.title}}</h1>

                <ArticleMeta :acticle="article"></ArticleMeta>

            </div>
        </div>

        <div class="container page">

            <div class="row article-content">
                <div class="col-md-12" v-html="article.body">

                </div>
            </div>

            <hr/>

            <div class="article-actions">
                <ArticleMeta :acticle="article"></ArticleMeta>
                <!--                <div class="article-meta">-->
                <!--                    <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg"/></a>-->
                <!--                    <div class="info">-->
                <!--                        <a href="" class="author">alice</a>-->
                <!--                        <span class="date">January 20th</span>-->
                <!--                    </div>-->

                <!--                    <button class="btn btn-sm btn-outline-secondary">-->
                <!--                        <i class="ion-plus-round"></i>-->
                <!--                        &nbsp;-->
                <!--                        Follow Eric Simons <span class="counter">(10)</span>-->
                <!--                    </button>-->
                <!--                    &nbsp;-->
                <!--                    <button class="btn btn-sm btn-outline-primary">-->
                <!--                        <i class="ion-heart"></i>-->
                <!--                        &nbsp;-->
                <!--                        Favorite Post <span class="counter">(29)</span>-->
                <!--                    </button>-->
                <!--                </div>-->
            </div>

            <div class="row">

                <div class="col-xs-12 col-md-8 offset-md-2">
                    <ArticleComments :acticle="article"></ArticleComments>
<!--                    <div class="card">-->
<!--                        <div class="card-block">-->
<!--                            <p class="card-text">With supporting text below as a natural lead-in to additional-->
<!--                                content.</p>-->
<!--                        </div>-->
<!--                        <div class="card-footer">-->
<!--                            <a href="" class="comment-author">-->
<!--                                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>-->
<!--                            </a>-->
<!--                            &nbsp;-->
<!--                            <a href="" class="comment-author">Jacob Schmidt</a>-->
<!--                            <span class="date-posted">Dec 29th</span>-->
<!--                        </div>-->
<!--                    </div>-->

<!--                    <div class="card">-->
<!--                        <div class="card-block">-->
<!--                            <p class="card-text">With supporting text below as a natural lead-in to additional-->
<!--                                content.</p>-->
<!--                        </div>-->
<!--                        <div class="card-footer">-->
<!--                            <a href="" class="comment-author">-->
<!--                                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>-->
<!--                            </a>-->
<!--                            &nbsp;-->
<!--                            <a href="" class="comment-author">Jacob Schmidt</a>-->
<!--                            <span class="date-posted">Dec 29th</span>-->
<!--                            <span class="mod-options">-->
<!--              <i class="ion-edit"></i>-->
<!--              <i class="ion-trash-a"></i>-->
<!--            </span>-->
<!--                        </div>-->
<!--                    </div>-->

                </div>

            </div>

        </div>

    </div>

</template>

<script>
  import {getArticle} from '@/utils/articles'
  import MarkdownIt from 'markdown-it'
  import ArticleMeta from './components/article-meta'
  import ArticleComments from './components/article-comments'

  export default {
    name: "ArticleIndex",
    middleware: 'authenticated',
    async asyncData({params}) {
      const {data} = await getArticle(params.slug)
      console.log(data)
      const {article} = data
      const md = new MarkdownIt()
      article.body = md.render(article.body)
      return {
        article: data.article
      }

    },
    components: {
      ArticleMeta,
      ArticleComments
    },
    head() {
      return {
        title: `${this.article.title}-realWorld`,
        meta: [
          {
            hid:'description',name:'description',
            content:this.article.description
          }
        ]

      }
    }
  }
</script>

<style scoped>

</style>
