/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 10:43:15
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 11:48:11
 * @FilePath: \vue3ts\src\utils\http\axiosTransform.ts
 */

import type { Axios, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result, createAxiosOptions } from './types'


export interface CreateAxiosOptions extends AxiosRequestConfig {
	authenticationScheme: string
	transform?: AxiosTransform
	requestOptions?: RequestOptions

}

export abstract class AxiosTransform {
	/**
 * @description: 请求之前处理配置
 * @description: Process configuration before request
 */
	beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig
	//请求成功处理
	transformRequestData?: (res: AxiosResponse<Result>, options: RequestOptions) => any
	// 请求失败处理
	requestCatch?: (e: Error) => Promise<any>
	// 请求之前拦截器
	requestInterceptors?: (config: AxiosRequestConfig, options: createAxiosOptions) => AxiosRequestConfig
	//请求之后的拦截器
	responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>
	// 请求之前的拦截器错误处理
	requestInterceptorsCatch?: (e: Error) => void
	// 请求之后的拦截器错误处理
	responseInterceptorsCatch?: (e: Error) => void
}