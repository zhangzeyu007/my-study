/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-01-14 12:16:25
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-02-28 21:38:53
 * @FilePath: \front\src\router\index.js
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

export default router
