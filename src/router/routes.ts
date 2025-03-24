export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/loginPage.vue'),
    name: 'login',
    alias: '/',
    title: '登录',
  },
  {
    path: '/index',
    component: () => import('@/views/indexPage.vue'),
    name: 'index',
    title: '首页',
  },
  {
    path: '/base',
    component: () => import('@/layout/layoutBasic.vue'),
    name: 'base',
    title: '基础页面',
    children: [
      {
        path: '/home',
        component: () => import('@/views/homePage.vue'),
        name: 'home',
        title: '首页',
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404Page.vue'),
    name: '404',
    title: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    title: '错误页面',
  },
]
