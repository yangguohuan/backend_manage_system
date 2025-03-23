export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/loginPage.vue'),
    name: 'login',
  },
  {
    path: '/home',
    component: () => import('@/views/homePage.vue'),
    name: 'home',
  },
  {
    path: '/404',
    component: () => import('@/views/404Page.vue'),
    name: '404',
  },
  {
    path: '/index',
    component: () => import('@/views/indexPage.vue'),
    name: 'index',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
