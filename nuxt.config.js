export default {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {

      //清除nuxt.js基于pages目录默认生成的路由表规则
      routes.splice(0)
      routes.push(...[{
        path: '/',
        components: {
          default: resolve(__dirname, 'pages/layout/index'), // or routes[index].component
        },
        children:[
          {
            path:'',//默认子路由
            name:'home',
            components: {
              default: resolve(__dirname, 'pages/home/index'), // or routes[index].component
            },
          },
          {
            path:'/login',
            name:'login',
            components: {
              default: resolve(__dirname, 'pages/login/index'), // or routes[index].component
            },
          },
          {
            path:'/register',
            name:'register',
            components: {
              default: resolve(__dirname, 'pages/login/index'), // or routes[index].component
            },
          },
          {
            path:'/profile/:username',
            name:'profile',
            components: {
              default: resolve(__dirname, 'pages/profile/index'), // or routes[index].component
            },
          },
          {
            path:'/settings',
            name:'settings',
            components: {
              default: resolve(__dirname, 'pages/settings/index'), // or routes[index].component
            },
          },
          {
            path:'/editor',
            name:'editor',
            components: {
              default: resolve(__dirname, 'pages/editor/index'), // or routes[index].component
            },
          },
          {
            path:'/article/:slug',
            name:'article',
            components: {
              default: resolve(__dirname, 'pages/article/index'), // or routes[index].component
            },
          }
        ]
      }])
    }
  },
  plugins:[
      '~/plugins/request.js',
      '~/plugins/dayjs.js'
  ],
  server:{
    host:'0.0.0.0',
    port:3000
  }
}
