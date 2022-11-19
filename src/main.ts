import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// Element Plus 组件 默认 使用英语，如果你希望使用其他语言，你可以参考下面的方案。
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import './assets/css/icon.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { usePermissStore } from './store/permiss'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus, {
    locale: zhCn,
  })

app.use(router)
// 注册elementplus图标
// https://element-plus.gitee.io/zh-CN/component/icon.html
for (const [key, component] of Object.entries(ElementPlusIconsVue)){
  app.component(key, component)
}
// 自定义权限指令
const permiss = usePermissStore()
app.directive('permiss', {
  mounted(el, binding) {
      if(!permiss.key.includes(String(binding.value))){
          el['hidden'] = true;
      }
  }
})

app.mount('#app')
