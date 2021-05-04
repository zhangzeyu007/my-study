/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-27 14:33:44
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-30 15:03:56
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
    redirect: "/communitybank",
    children: [
      {
        path: "/communitybank",
        name: "CommunityBank",
        component: () => import("../views/CommunityBank.vue"),
      },
      {
        path: "/communitydetail",
        name: "CommunityDetail",
        component: () => import("../views/CommunityDetail.vue"),
      },
      {
        path: "/communitybusiness",
        name: "CommunityBusiness",
        component: () => import("../views/CommunityBusiness.vue"),
      },
      {
        path: "/luckywheel",
        name: "LuckyWheel",
        component: () => import("../views/LuckyWheel.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
