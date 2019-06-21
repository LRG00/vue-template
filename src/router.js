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
      meta: {
        requireAuth: true
      },
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
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (window.localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default vueRouter
