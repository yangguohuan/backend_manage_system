import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'
import { asyncRoute } from './routes' // 你定义的异步路由文件

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute,
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

// 动态添加异步路由
asyncRoute.forEach((route) => {
  router.addRoute(route)
})

export default router
