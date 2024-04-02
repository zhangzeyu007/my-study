/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-29 10:40:33
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 18:19:05
 * @FilePath: \vue3ts\src\router\index.ts
 */
import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { main } from './modules/main';
import { createRouterGuards } from './routerGuards';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '首页',
    },
    children: [
      ...main,
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        meta: {
          title: 'NotFound',
        },
        redirect: '/',
      },
    ]
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export function setupRouter(app: App) {
  app.use(router);
  console.log(router);
  // 创建路由守卫
  createRouterGuards(router);
}



export default router
