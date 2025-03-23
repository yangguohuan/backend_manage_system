import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/loginPage.vue'),
    },
    {
      path: '/home',
      component: () => import('@/views/homePage.vue'),
    },
    {
      path: '/404',
      component: () => import('@/views/404Page.vue'),
    },
  ],
})

export default router
