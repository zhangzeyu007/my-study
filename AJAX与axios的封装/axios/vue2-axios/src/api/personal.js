/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-10 17:02:47
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-10 21:43:57
 */
import axios from './http.js'

function login() {
    return axios.get('/weatherInfo',
        {
            params: {
                key: 'fb7ba8c0308ea97635042e9e6f1ad102',
                city: 330100,
                extensions: "all",
                output: 'JSON'
            }
        })
}

export default {
    login
}