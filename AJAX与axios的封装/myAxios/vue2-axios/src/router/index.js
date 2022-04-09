/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-02 14:28:18
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-11 14:58:35
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: "About",
      component: () => import('../view/about.vue')
    }
  ]
})
