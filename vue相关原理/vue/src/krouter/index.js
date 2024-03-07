/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-15 16:48:05
 * @FilePath: \vue\src\krouter\index.js
 */
import Vue from "vue";
import VueRouter from "./kvue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

// 1.use一下,VueRouter是一个插件
// 做了什么
// 声明两个全局组件
/*
 需求分析
 spa页面不能刷新
 hash #/about
 History api /about
 根据url显示对应的内容
 router-view
数据响应式: current变量持有url 地址, 一旦变化, 动态重新执行render函数

 任务
 1.实现VueRouter类
    处理路由选择
    监控url变化, hashchange
    响应这个变化
 2.实现install方法
   $router注册
   两个全局组件
*/

// use会调用VueRouter.install(Vue)
Vue.use(VueRouter);

// 2.声明一个路由表
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

// 3.创建一个Router实例
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
