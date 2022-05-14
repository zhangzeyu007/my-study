/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-07 21:24:59
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-08 17:48:51
 */
console.log('哈哈');
return
import Ajax from './ajax.js'

import {
    ERROR_HTTP_CODE,
    ERROR_HTTP_CODE_TEXT,
    ERROR_REQUEST,
    ERROR_REQUEST_TEXT,
    ERROR_TIMEOUT,
    ERROR_TIMEOUT_TEXT,
    ERROR_ABORT,
    ERROR_ABORT_TEXT
} from './constants'

const ajax = (url, options) => {
    let xhr;
    const p = new Promise((resolve, reject) => {
        xhr = new Ajax(url, ...options, ...{
            success(response) {
                resolve(response)
            },
            httpCodeError(status) {
                reject(
                    {
                        type: ERROR_HTTP_CODE,
                        text: `${ERROR_HTTP_CODE_TEXT}:${status}`,
                    }
                )
            },
            error() {
                reject({
                    type: ERROR_REQUEST,
                    text: ERROR_REQUEST_TEXT
                })
            },
            abort() {
                reject({
                    type: ERROR_ABORT,
                    text: ERROR_ABORT_TEXT
                })
            },
            timeout() {
                reject({
                    type: ERROR_TIMEOUT,
                    text: ERROR_TIMEOUT_TEXT
                })
            }
        }).getXHR()
    })

    return p
}

const get = (url, options) => {
    return Ajax(url, { ...options, methods: "GET" })
}

const post = (url, options) => {
    return Ajax(url, { ...options, methods: "POST" })
}

const getJSON = (url, options) => {
    return Ajax(url, { ...options, methods: "GET", responseType: "json" })
}

export { ajax, get, post, getJSON }