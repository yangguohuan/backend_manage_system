// 路由鉴权
import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useCategoryStore } from './stores/modules/Category'
import { usePeginationStore } from './stores/modules/Pegination'

nprogress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  const categoryStore = useCategoryStore()
  const peginationStore = usePeginationStore()
  categoryStore.divSelector = 0
  categoryStore.thirdCategoryId = 0
  peginationStore.pegination.keyword = ''
  document.title = '即刻-' + to.meta.title
  nprogress.start()
  const token = localStorage.getItem('TOKEN')
  if (token) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      next()
    }
  } else {
    // 未登录的情况，如果访问login则放行，如果访问其他路由则禁止，让其访问至login
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach((to, from) => {
  nprogress.done()
  return { to, from }
})
