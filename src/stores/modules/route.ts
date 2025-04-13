import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes'

const useRouteStore = defineStore('route', () => {
  const menuRoutes = constantRoute
  const refreshRoute = constantRoute
  return { menuRoutes, refreshRoute }
})

export default useRouteStore
