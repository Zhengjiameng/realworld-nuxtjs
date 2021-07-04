<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>

                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input class="form-control" type="text" placeholder="URL of profile picture"
                                v-model="userInfo.image">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="text" placeholder="Your Name"
                                       v-model="userInfo.username">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you"
                                          v-model="userInfo.bio"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="text" placeholder="Email"
                                       v-model="userInfo.email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="password" placeholder="Password"
                                       v-model="userInfo.password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right" @click="update">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                    <hr>
                    <button class="btn btn-outline-danger" @click="loginout()">
                        Or click here to logout.
                    </button>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
  import {updateUser} from '@/utils/user'
  import {mapState} from 'vuex'
  //仅在客户端加载js-cookie
  const Cookie=process.client?require('js-cookie'):null
  export default {
    name: "SettingsIndex",
    middleware:'authenticated',
    data(){
      return{
        "userInfo":{
          "email": "",
              "bio": "",
              "image": "",
          password:'',
          username:''
        }
      }
    },
    computed:{
      ...mapState(['user'])
    },
    mounted(){
      this.userInfo.email=this.user.email
      this.userInfo.username=this.user.username
    },
    methods:{
      async update(){
        await updateUser({user:this.userInfo})
      },
      loginout(){
        this.$store.commit('setUser',undefined)
        Cookie.set('user',undefined)
        this.$router.push('/')
      },
    }
  }
</script>

<style scoped>

</style>
