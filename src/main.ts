import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import globalComponent from '@/components/index'
import pinia from './stores'

import 'virtual:svg-icons-register'
import './style/index.scss'

const app = createApp(App)

app.use(globalComponent)
app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
