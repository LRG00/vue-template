/**
 * 基础路由
 * @type { *[] }
 */
import { UserLayout, RouteView } from '@/layouts'

export const constantRouterMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/map',
    component: RouteView,
    // meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
    children: [
      // 外部链接
      {
        // path: 'https://www.baidu.com/',
        // name: 'Monitor',
        // meta: { title: '监控页（外部）', target: '_blank' }
        path: 'map',
        name: 'map',
        component: () => import('@/views/dashboard/Map.vue'),
        // meta: { title: '地图', keepAlive: true, permission: [ 'dashboard' ] }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/login',
    component: UserLayout,
    children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/user/Login.vue')
        },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register.vue')
      },
      // {
      //   path: 'register-result',
      //   name: 'registerResult',
      //   component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult.vue')
      // }
    ]
  },

  // {
  //   path: '/test',
  //   component: BlankLayout,
  //   redirect: '/test/home',
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'TestHome',
  //       component: () => import('@/views/Home')
  //     }
  //   ]
  // },

  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // }

]