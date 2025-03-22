import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
