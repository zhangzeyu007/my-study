/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-10 09:59:31
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-10 10:02:12
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
