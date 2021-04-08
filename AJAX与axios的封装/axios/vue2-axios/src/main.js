/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-02 14:28:18
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-10 17:09:07
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import { Button, Select } from 'element-ui';
import api from './api/api'

Vue.prototype.$api = api
Vue.use(Button)
Vue.use(less)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
