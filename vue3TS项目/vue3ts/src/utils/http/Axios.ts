/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 10:42:23
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 18:30:56
 * @FilePath: \vue3ts\src\utils\http\Axios.ts
 */
import type { Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import axios from 'axios'
import qs from 'qs'
import { cloneDeep } from 'lodash-es'
import type { createAxiosOptions, RequestOptions, Result } from './types'
import { AxiosCanceler } from './axiosCancel'
import { isFunction } from '../is'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'


export class VAxios {
	private axiosInstance: AxiosInstance
	private options: createAxiosOptions
	constructor(options: createAxiosOptions) {
		this.options = options
		this.axiosInstance = axios.create(options)
		this.setupInterceptors()

	}
	private getTransform() {
		const { transform } = this.options
		return transform
	}
	/**
 * @description:  创建axios实例
 */
	private createAxios(config: createAxiosOptions): void {
		this.axiosInstance = axios.create(config)
	}

	getAxios(): AxiosInstance {
		return this.axiosInstance
	}

	// 重新配置axiso
	configAxiso(options: createAxiosOptions) {
		if (!this.axiosInstance) {
			return
		}
		this.createAxios(options)
	}

	//设置通用header

	setHeaders(headers: any): void {
		if (!this.axiosInstance) {
			return;
		}
		Object.assign(this.axiosInstance.defaults.headers, headers)
	}
	// 请求方法
	request<T = any>(config: createAxiosOptions, options?: RequestOptions): Promise<T> {

		let conf: AxiosRequestConfig = cloneDeep(config)
		const transform = this.getTransform()
		const { requestOptions } = this.options
		const opt: RequestOptions = { ...requestOptions, ...options }

		const { beforeRequestHook, requestCatch, transformRequestData } = transform || {}
		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			conf = beforeRequestHook(conf, opt)
		}

		// 重新赋值成最新的配置
		// @ts-expect-error
		conf.requestOptions = opt
		conf = this.supportFormData(conf)
		return new Promise((resolve, reject) => {
			this.axiosInstance.request<any, AxiosResponse<Result>>(conf).then((res: AxiosResponse<Result>) => {
				// 请求是否被取消
				const isCancel = axios.isCancel(res)
				if (transformRequestData && isFunction(transformRequestData) && !isCancel) {
					try {
						const ret = transformRequestData(res, opt)
						resolve(ret)
					} catch (e) {
						reject(e)
					}
					return;
				}
				resolve(res as unknown as Promise<T>)
			}).catch((e: Error) => {
				if (requestCatch && isFunction(requestCatch)) {
					reject(requestCatch(e))
					return
				}
				reject(e)
			})
		})
	}
	// 支持formdata
	supportFormData(config: AxiosRequestConfig) {
		const headers = config.headers || this.options.headers
		const contentType = headers?.['Content-Type'] || headers?.['content-type']

		if (contentType !== ContentTypeEnum.FORM_URLENCODED || !Reflect.has(config, 'data') || config.method?.toUpperCase() === RequestEnum.GET) {

			return config
		}

		return {
			...config,
			data: qs.stringify(config.data, { arrayFormat: "brackets" })
		};
	}

	// 拦截器配置
	private setupInterceptors() {
		const transform = this.getTransform()
		if (!transform) {
			return;
		}
		const {
			requestInterceptors,
			requestInterceptorsCatch,
			responseInterceptors,
			responseInterceptorsCatch } = transform

		const axiosCanceler = new AxiosCanceler()
		// @ts-expect-error
		this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
			const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config
			const ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken

			!ignoreCancel && axiosCanceler.addPending(config)
			if (requestInterceptors && isFunction(requestInterceptors)) {
				config = requestInterceptors(config, this.options)
			}
			return config
		}, undefined)

		// 响应结果拦截器
		this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
			res && axiosCanceler.removePending(res.config)
			if (responseInterceptors && isFunction(responseInterceptors)) {
				res = responseInterceptors(res)
			}
			return res
		}, undefined)
		// 响应错误捕获
		responseInterceptorsCatch && isFunction(responseInterceptorsCatch) &&
			this.axiosInstance.interceptors.response.use(undefined, requestInterceptorsCatch)
	}
}