/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-04 19:20:38
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-11 19:12:19
 * @FilePath: \vue3-warter\src\main.js
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
console.log(import.meta.env)
app.use(router)
app.mount('#app')
