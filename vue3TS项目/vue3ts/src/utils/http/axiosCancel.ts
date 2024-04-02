/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 11:53:08
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 12:54:43
 * @FilePath: \vue3ts\src\utils\http\axiosCancel.ts
 */

import type { AxiosRequestConfig, Canceler } from "axios";
import axios from "axios";
import qs from "qs";
import { isFunction } from '@/utils/is'


let pendingMap = new Map<string, Canceler>();

export function getPendingUrl(config: AxiosRequestConfig) {
	return [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&')
}


export class AxiosCanceler {
	// 添加请求
	addPending(config: AxiosRequestConfig) {
		// this.removePending(config)
		const pendingUrl = getPendingUrl(config)
		config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
			if (!pendingMap.has(pendingUrl)) {
				pendingMap.set(pendingUrl, cancel) // 添加请求
			}
		})
	}
	// 清空所有pending
	removeAllPending() {
		pendingMap.forEach(cancel => {
			cancel && isFunction(cancel) && cancel()
		})
		pendingMap.clear()
	}
	// 清除指定pending
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config)
		if (pendingMap.has(url)) {
			// 如果在pedingMap中存在，则取消请求
			const cancel = pendingMap.get(url)
			cancel && isFunction(cancel) && cancel()
			pendingMap.delete(url)
		}
	}
	// 重置
	reset(): void {
		pendingMap = new Map<string, Canceler>();
	}

}