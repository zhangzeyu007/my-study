/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-06-05 17:27:32
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-06 22:50:56
 * @FilePath: \my-study\vite学习\vite-project\src\main.js
 */
import { createApp } from "vue";
// import App from "./App.vue";

createApp(App).mount("#app");

// 默认采用的是es6 原生的模块 (import 语法 在 es6 中默认会发送一个请求)
// 默认会给vue 的模块增加一个前缀 /@module
// 把 .vue 文件在 后端给解析成一个对象 ( 唯一就是编译了.vue 文件)

// node Koa 快速搭建 http 服务
