/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-27 14:33:44
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-30 09:35:47
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../static/css/reset.css";
import "../static/js/fontSize.js";
import "../static/icons/iconfont.css";
import "../static/icons/index.js";
import api from "./api/api.js";
Vue.prototype.$api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
