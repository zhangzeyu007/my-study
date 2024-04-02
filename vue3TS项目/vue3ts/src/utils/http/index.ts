/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 10:43:48
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 18:51:26
 * @FilePath: \vue3ts\src\utils\http\index.ts
 */
import type { AxiosResponse } from 'axios'
import type { AxiosTransform } from './axiosTransform'
import type { createAxiosOptions, RequestOptions, Result } from './types'
import axios from 'axios'
import { VAxios } from './Axios'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum'
import { PageEnum } from '@/enums/pageEnum'
import { showDialog, showFailToast } from 'vant'
import { deepMerge, isUrl } from '@/utils'
import router from '@/router'
import { storage } from '@/utils/Storage'

const transform: AxiosTransform = {
	transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
		const {
			isShowMessage = true,
			isShowErrorMessage,
			isShowSuccessMessage,
			successMessageText,
			errorMessageText,
			isTransformResponse,
			isReturnNativeResponse,
		} = options

		// 是否返回原生响应头 比如：需要获取响应头时使用该属性
		if (isReturnNativeResponse) {
			return res
		}
		// 不进行任何处理，直接返回
		// 用于页面代码可能需要直接获取code，data，message这些信息时开启
		if (!isTransformResponse) {
			return res.data
		}
		const { data } = res

		if (!data) {
			throw new Error('接口返回数据异常')
		}

		const { code, message, result } = data
		const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
		// 是否显示提示信息
		if (isShowMessage) {
			if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
				showDialog({
					message: successMessageText || message || '操作成功！',
				}).then(() => {
					// on close
				})
			} else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
				// 是否显示自定义信息提示
				showFailToast(message || errorMessageText || '操作失败！')
			} else if (!hasSuccess && options.errorMessageMode === 'modal') {
				// errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
				showDialog({
					title: '提示',
					message,
				}).then(() => {
					// on close
				})
			}
		}
		// 接口请求成功，直接返回结果
		if (code === ResultEnum.SUCCESS) {
			return result
		}
		// 接口请求错误，统一提示错误信息 这里逻辑可以根据项目进行修改
		const errorMsg = message
		const LoginName = PageEnum.BASE_LOGIN_NAME
		const LoginPath = PageEnum.BASE_LOGIN
	}
}

// 数据处理, 方便区分多种处理方式
function createAxios(opt?: Partial<createAxiosOptions>) {
	return new VAxios(deepMerge(
		{
			timeout: 10 * 1000,
			authenticationScheme: '',
			// 如果是json格式
			headers: { 'Content-Type': ContentTypeEnum.JSON },
			// headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
			// 配置项，下面的选项都可以在独立的接口请求中覆盖
			requestOptions: {
				// 默认将prefix 添加到url
				apiUrl: import.meta.env.BASE_URL,
				joinPrefix: true,
				// 数据处理方式
				transform,
				// 是否返回原生响应头 比如：需要获取响应头时使用该属性
				isReturnNativeResponse: false,
				// 需要对返回数据进行处理
				isTransformResponse: true,
				// post请求的时候添加参数到url
				joinParamsToUrl: false,
				// 格式化提交参数时间
				formatDate: true,
				// 消息提示类型
				errorMessageMode: 'none',
				//  是否加入时间戳
				joinTime: true,
				// 忽略重复请求
				ignoreCancelToken: true,
				// 是否携带token
				withToken: true,
			},
			withCredentials: false,
		},
		opt || {},
	),)
}



export const http = createAxios()