/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 11:19:37
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-09 11:16:52
 */

export default {
    namespaced: true,
    state: {
        isLogin: false,
        content: '',
        username: ''
    },
    mutations: {
        login(state, username) {
            state.isLogin = true
            state.content = username
            state.username = username
        },
        loginOut(state, payload) {
            state.isLogin = false
            state.content = payload
            state.username = ''
        }
    },
    getters: {
        welcome: state => state.username + ',欢迎光临'
    },
    actions: {
        loginOut({ commit }, payload) {
            return new Promise((resovle, reject) => {
                setTimeout(() => {
                    if (payload == '登出') {
                        commit('loginOut', payload)
                        resovle('登出成功')
                    } else {
                        reject('出错了')
                    }
                }, 1000)
            })
        }
    }
}