// 路由鉴权
import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
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
  next()
})

router.afterEach((to, from) => {
  console.log(to, from)
  nprogress.done()
})
