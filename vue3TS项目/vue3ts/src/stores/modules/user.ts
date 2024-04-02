/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 16:31:48
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 17:59:47
 * @FilePath: \vue3ts\src\stores\modules\user.ts
 */
import { defineStore } from 'pinia'

import { createStorage } from '@/utils/Storage'
import { ACCESS_TOKEN, CURRENT_USER } from '../mutation-types'


const Storage = createStorage({ storage: localStorage })


interface UserInfo {
	userId: string | number
	username: string
	realname: string
}

interface IUserState {
	token?: string
	userInfo: UserInfo
}

interface LoginParams {
	username: string
	password: string
}


export const useUserStore = defineStore({
	id: 'app-user',
	state: (): IUserState => ({
		userInfo: null,
		token: undefined
	}),
	getters: {
		getUserInfo() {
			return this.userInfo || Storage.get(CURRENT_USER, '') || {}
		},
		getToken() {
			return this.token || Storage.get(ACCESS_TOKEN, '')
		}
	},
	actions: {
		setToken(token: string | undefined) {
			this.token = token || ''
			Storage.set(ACCESS_TOKEN, token)
		},
		setUserInfo(info: UserInfo | null) {
			this.userInfo = info
			Storage.set(CURRENT_USER, info)
		}

	}
})