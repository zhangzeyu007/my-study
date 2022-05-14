/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-07 17:27:41
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-07 22:06:19
 */
import DEFAULTS from './defaults'
import { serialize, addURLData, serilizeJSON } from './util'

import { HTTP_GET, CONTENT_TYPE_JSON, CONTENT_TYPE_FORM_URLENCODED } from './constants'
// Ajax类
class Ajax {
    constructor(url, options) {
        this.url = url
        this.options = Object.assign({}, DEFAULTS, options)
        // 初始化
        this.init()
    }
    // 初始化
    init() {
        const xhr = new XMLHttpRequest()
        this.xhr = xhr
        // 绑定事件的响应程序
        this.bindEvent()
        // 准备发送请求
        xhr.open(this.options.methods, this.url + this.addParam(), true)
        // 跨域
        xhr.setRequestHeader("Access-Control-Allow-Origin：*")
        // 设置responseType
        this.setResponseType()
        // 设置超时
        this.setTimeout()
        // 设置跨域是否携带cookie
        this.setCookie()
        // 发送请求
        this.sendData()
    }
    // 绑定事件的响应程序
    bindEvent() {
        const xhr = this.xhr;
        const { success, httpCodeError, error, abort, timeout } = this.options
        xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                console.log(xhr.response);
                success(xhr.response, xhr);
            } else {
                httpCodeError(xhr.status, xhr)
            }
        })
        // error
        xhr.addEventListener('error', () => {
            error(xhr)
        })
        // abort
        xhr.addEventListener("abort", () => {
            abort(xhr)
        })
        // timeout
        xhr.addEventListener("timeout", () => {
            timeout(xhr)
        })
    }
    // 在地址上添加数据
    addParam() {
        const { params } = this.options
        if (!params) return "";
        addURLData(this.url, serialize(params))
    }
    // 设置responseType
    setResponseType() {
        this.xhr.responseType = this.options.responseType
    }
    setTimeout() {
        const { timeoutTime } = this.options

        if (timeoutTime > 0) {
            this.xhr.timeout = timeoutTime
        }
    }
    // 设置跨域是否携带cookie
    setCookie() {
        if (this.xhr.withCredentials) {
            this.xhr.withCredentials = true
        }
    }
    // 发送数据Data
    sendData() {
        const xhr = this.xhr;
        if (!this.isSendData()) {
            return xhr.send(null)
        }
        let resultData = null
        // 发送FormData 数据
        if (this.isFormData()) {
            // 发送 FormURLEncodedData 数据
            resultData = data
        } else if (this.isFormURLEncodedData()) {
            // 发送FormData格式数据
            this.setContentType(CONTENT_TYPE_FORM_URLENCODED)
            xhr.setRequestHeader('Content-Type', 'application/json')
            resultData = serialize(data)

        } else if (this.isJSONData()) {
            // JSON 格式数据
            this.setContentType(CONTENT_TYPE_JSON)
            resultData = serilizeJSON(data)
        } else {
            // 其他格式数据
            resultData = data
        }

    }
    // 是否需要使用sendData
    isSendData() {
        const { data, methods } = this.options
        if (!data) return false;
        if (methods.toLowerCase() === HTTP_GET.toLowerCase()) return false

        return true
    }
    // 判断是否发送FormData数据
    isFormData() {
        return this.options.data instanceof FormData;
    }
    isFormURLEncodedData() {
        return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_FORM_URLENCODED)
    }
    // 判断是否是json
    isJSONData() {
        return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_JSON)
    }
    // 设置发送的数据格式
    setContentType(contentType = this.options.contentType) {
        if (!contentType) return;
        this.xhr.setRequestHeader("Content-Type", contentType)
    }
    // 获取XHR对象
    getXHR() {
        return this.xhr
    }
}


export default Ajax;