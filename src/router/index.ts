import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute,
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

export default router
