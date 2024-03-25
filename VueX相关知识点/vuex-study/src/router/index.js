/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-03-27 10:32:33
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-25 15:51:26
 * @FilePath: \my-study\VueX相关知识点\vuex-study\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
