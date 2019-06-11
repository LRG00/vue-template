import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const vueRouter = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: () => import('./views/profile/index.vue')
        },
        {
          path: '/item1',
          name: 'item1',
          component: () => import('./views/item1.vue')
        },
        {
          path: '/item2',
          name: 'item2',
          component: () => import('./views/item2.vue')
        },
        {
          path: '/item3',
          name: 'item3',
          component: () => import('./views/item3.vue')
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('./views/dashboard/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
vueRouter.beforeEach(function (to, from, next) {
  console.log(to, from, next)
  // const nextRoute = [ 'account', 'order', 'course']
  // const auth = store.state.auth
  // // 跳转至上述3个页面
  // if (nextRoute.indexOf(to.name) >= 0) {
  //   // 未登录
  //   if (!store.state.auth.IsLogin) {
  //     vueRouter.push({ name: 'login' })
  //   }
  // }
  // 已登录的情况再去登录页，跳转至首页
  if (to.name === 'login') {
    // if (auth.IsLogin) {
    //   vueRouter.push({ name: 'home' })
    // }
  }
  next()
})

export default vueRouter
