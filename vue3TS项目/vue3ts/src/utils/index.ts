/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 17:10:42
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 17:14:28
 * @FilePath: \vue3ts\src\utils\index.ts
 */
import { isObject } from './is/index'

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
	let key: string
	for (key in target) {
		src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
	}
	return src;
}

const RegExp = /^http(s)?:\/\//iu
export function isUrl(url: string) {
	return RegExp.test(url);
}