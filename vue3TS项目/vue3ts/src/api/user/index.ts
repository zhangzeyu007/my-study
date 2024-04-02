/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 16:56:25
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 18:48:40
 * @FilePath: \vue3ts\src\api\user\index.ts
 */
import { http } from '@/utils/http/index'

export interface BasicResponseModel<T = any> {
	code: number;
	message: string;
	result: T;
}
/**
 * @description: 用户登录
 */
export function login(params: any) {
	return http.request<BasicResponseModel>(
		{
			url: '/login',
			method: 'POST',
			params,
		},
		{
			isTransformResponse: false,
		},
	)
}