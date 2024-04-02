/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 15:56:18
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 15:59:38
 * @FilePath: \vue3ts\src\stores\index.ts
 */

import type { App } from 'vue'

import { createPinia } from 'pinia'

import pinaPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(pinaPersist)


export function setupStore(app: App<Element>) {
	app.use(store)
}

export { store }



