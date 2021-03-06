import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'
import Commont from '../views/comment/index.vue'
import Material from '../views/material/index.vue'
import Articles from '../views/articles/index.vue'
import Account from '../views/account/index.vue'
// import RouterBeforeEach from '../permission'
import PublishArticles from '../views/publisharticles/index.vue'
Vue.use(VueRouter)

const routes = [
  { // 强制跳转
    path: '/',
    redirect: '/home'
  },
  {
    path: '*', // 匹配任何地址 但是如果其他的可以匹配 优先匹配其他组件 否则匹配该组件
    component: () => import('../404.vue')
  },
  { // 主页
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/list',
        component: Home2
      }, {
        // 这是二级路由表
        path: '/home/comment',
        component: Commont
        // component: () => import('../views/comment/index.vue')
      },
      {
        path: '/home/material',
        component: Material
      },
      {
        path: '/home/articles',
        component: Articles
      },
      {
        path: '/home/publish',
        component: PublishArticles
      },
      {
        path: '/home/publish/:articleId', // 此规则只限定于修改界面
        component: PublishArticles
      },
      {
        path: '/home/account',
        component: Account
      }
    ]
  },
  { // 登录页
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
