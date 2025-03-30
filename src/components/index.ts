import type { App, Component } from 'vue'
import svgIcon from './svgIcon/svgIcon.vue'
import category from './category/indexComponents.vue'

const globalComponents: Record<string, Component> = { svgIcon, category }

export default {
  install(app: App): void {
    Object.keys(globalComponents).forEach((key: string) => {
      app.component(key, globalComponents[key])
    })
  },
}
