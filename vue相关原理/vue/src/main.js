/*
 * @Description: 组件
 * @Author: 小鱼
 * @Date: 2020-10-06 18:06:45
 * @LastEditors: 海象
 * @LastEditTime: 2020-12-26 13:35:37
 */
import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "./store";
// import store from "./kstore";
import "@/icons";
import "./permission";

Vue.config.productionTip = false;

// 事件总线
Vue.prototype.$bus = new Vue();

//3.挂载router实例
new Vue({
  router, // 挂载
  store,
  render: h => h(App)
}).$mount("#app");
