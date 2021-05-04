/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-05-04 15:05:41
 * @LastEditors: 海象
 * @LastEditTime: 2021-05-04 15:25:59
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '../static/css/reset.css'
import '../static/css/fontSize.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
