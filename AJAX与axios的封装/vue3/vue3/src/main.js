/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-02 13:59:26
 * @LastEditors: 海象
 * @LastEditTime: 2020-12-02 15:49:29
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/style.css'
import less from 'less'
Vue.use(less)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
