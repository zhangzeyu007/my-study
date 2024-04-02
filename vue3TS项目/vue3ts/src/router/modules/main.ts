import { RouteRecordRaw } from "vue-router"


export const main: Array<RouteRecordRaw> = [
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/home/index.vue'),
		meta: {
			title: '首页',
			icon: 'home-o',
		}
	},
	{
		path: '/category',
		name: 'Category',
		component: () => import('@/views/category/index.vue'),
		meta: {
			title: '分类',
			icon: 'apps-o',
		},
	},
]