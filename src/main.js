import 'bootstrap'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Vue3Toastify, {
  autoClose: 2000, //自動關閉時間
  // position: toast.POSITION.TOP_CENTER, //提示窗位置
})
app.mount('#app')
