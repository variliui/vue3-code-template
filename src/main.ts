import './styles/index.scss'

import { createApp } from 'vue'
//@ts-ignore
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import 'uno.css'
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import './mock'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import 'default-passive-events'
// "build": "run-p type-check \"build-only {@}\" --",
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
pinia.use(
  createPersistedState({
    storage: localStorage,
    auto: true
  })
)

app.use(pinia)
app.use(router)
app.mount('#app')
