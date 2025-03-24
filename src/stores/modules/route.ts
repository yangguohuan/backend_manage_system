import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes'

const useRouteStore = defineStore('route', () => {
  const menuRoutes = constantRoute
  return { menuRoutes }
})

export default useRouteStore
