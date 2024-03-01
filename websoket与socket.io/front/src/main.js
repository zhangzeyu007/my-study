/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-01-14 12:16:25
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-01-14 14:18:18
 * @FilePath: \front\src\main.js
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
