/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-29 13:42:23
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-30 16:21:04
 * @FilePath: \vue3ts\src\plugins\index.ts
 */
import { App } from 'vue';
import './vant';
import Vant from 'vant';
// import { vantPlugins } from './vant';

export const setupPlugins = (app: App) => {
	app.use(Vant);
};