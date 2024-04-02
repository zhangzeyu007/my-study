/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-29 10:40:34
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 18:57:24
 * @FilePath: \vue3ts\src\main.ts
 */


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupPlugins } from './plugins';
import App from './App.vue'
import { setupRouter } from './router';

const app = createApp(App)

// 安装插件（vant-ui等）,若使用了 vite-plugin-components 插件，则需要手动引入组件
setupPlugins(app)
// 安装 Pinia
app.use(createPinia())
// 安装router
setupRouter(app);

app.mount('#app')
