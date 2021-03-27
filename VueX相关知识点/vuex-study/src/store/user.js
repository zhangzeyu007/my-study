/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 11:19:37
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 11:21:02
 */
export default {
    namespaced: true,
    state: {
        isLogin: false,
        content: ''
    },
    mutations: {
        login(state, payload) {
            state.isLogin = true
            state.content = payload
        },
        loginOut(state, payload) {
            state.content = payload
        }
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