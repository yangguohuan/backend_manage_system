import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import globalComponent from '@/components/index'
import pinia from './stores'

import 'virtual:svg-icons-register'
import './style/index.scss'

const app = createApp(App)

app.use(globalComponent)
app.use(pinia)
app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import './permission'

app.mount('#app')
