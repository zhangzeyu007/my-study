/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-07 17:34:13
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-07 21:25:57
 */

// 默认参数
import { HTTP_GET, CONTENT_TYPE_JSON, CONTENT_TYPE_FORM_URLENCODED } from './constants'

const DEFAULTS = {
    methods: HTTP_GET,
    // 请求头携带参数
    params: null,
    // 请求体携带的数据
    data: null,
    // 属性
    cotentType: CONTENT_TYPE_FORM_URLENCODED,
    responseType: "",
    withCredentials: false,
    // 方法
    success() { },
    httpCodeError() { },
    error() { },
    abort() { },
    timeout() { }
}

export default DEFAULTS