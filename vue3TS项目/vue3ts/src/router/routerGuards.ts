/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-30 14:21:21
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-30 14:23:13
 * @FilePath: \vue3ts\src\router\routerGuards.ts
 */

import { Router } from 'vue-router'

export function createRouterGuards(router: Router) {
	router.beforeEach((to, from, next) => {
		document.title = (to?.meta?.title as string) || 'Vue3.0 TypeScript'
		next()
	})
}