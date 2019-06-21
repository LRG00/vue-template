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
          path: '/post',
          name: 'post',
          component: () => import('./views/post/index.vue'),
          children: [
            {
              path: '/post/create',
              name: '/post/create',
              component: () => import('./views/post/create.vue')
            },
            {
              path: '/post/list',
              name: '/post/list',
              component: () => import('./views/post/list.vue')
            }
          ]
        },
        {
          path: '/cate',
          name: 'cate',
          component: () => import('./views/cate/index.vue'),
          children: [
            {
              path: '/cate/create',
              name: '/cate/create',
              component: () => import('./views/cate/create.vue')
            },
            {
              path: '/cate/list',
              name: '/cate/list',
              component: () => import('./views/cate/list.vue')
            }
          ]
        },
        {
          path: '/tag',
          name: 'tag',
          component: () => import('./views/tag/index.vue'),
          children: [
            {
              path: '/tag/create',
              name: '/tag/create',
              component: () => import('./views/tag/create.vue')
            },
            {
              path: '/tag/list',
              name: '/tag/list',
              component: () => import('./views/tag/list.vue')
            }
          ]
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/users/index.vue'),
          children: [
            {
              path: '/users/create',
              name: '/users/create',
              component: () => import('./views/users/create.vue')
            },
            {
              path: '/users/pwd',
              name: '/users/pwd',
              component: () => import('./views/users/pwd.vue')
            },
            {
              path: '/users/list',
              name: '/users/list',
              component: () => import('./views/users/list.vue')
            }
          ]
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('./views/setting/index.vue'),
          children: [
            {
              path: '/setting/base',
              name: '/setting/base',
              component: () => import('./views/setting/base.vue')
            },
            {
              path: '/setting/navigation',
              name: '/setting/navigation',
              component: () => import('./views/setting/navigation.vue')
            }
          ]
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
