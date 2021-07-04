<template>
    <div>
        <!--        头-->
        <nav class="navbar navbar-light">
            <div class="container">
                <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <nuxt-link to="/" class="nav-link" exact>Home</nuxt-link>
                    </li>
                    <template v-if="user">
                        <li class="nav-item">
                            <nuxt-link to="/editor" class="nav-link">
                                <i class="ion-compose"></i> New Post
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link to="/settings" class="nav-link"><i class="ion-gear-a"></i>Settings</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="`/profile/${user.username}`">
                                <img src="" alt="" class="user-pic">{{user.username}}
                            </nuxt-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
                        </li>
                    </template>


                </ul>
            </div>
        </nav>
        <nuxt-child/>
        <!--        尾部-->
        <footer>
            <div class="container">
                <a href="/" class="logo-font">conduit</a>
                <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
            </div>
        </footer>
    </div>

</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "LayouIndex",
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>

</style>
