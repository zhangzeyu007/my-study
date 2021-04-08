/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-10 16:13:05
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-10 17:00:08
 */

import qs from 'qs'

let baseURL = ''
let baseURLArr = [
    {
        type: "development",
        url: "http://127.0.0.1:8080"
    },
    {
        type: "test",
        url: "http://127.0.0.1:8080"
    },
    {
        type: "production",
        url: "http://127.0.0.1:8080"
    }
]

baseURLArr.forEach(item => {
    if (process.env.NODE_ENV === item.type) {
        baseURL = item.url
    }
})

export default function request(url, options = {}) {
    url = baseURL + url
    /**
     * GET系列请求处理
    */
    !options.method ? options.method = 'GET' : null
    if (options.hasOwnProperty('params')) {
        if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method)) {
            const ask = url.includes('?') ? '&' : '?';
            url += `${ask}${qs.stringify(parmas)}`
        }
        delete options.parmas;
    }
    /**
     * 合并配置项
    */

    options = Object.assign({
        // 允许跨域携带资源凭证 same-origin  同源可以omit都拒绝
        credentials: "include",
        // 设置请求头
        headers: {}
    }, options)
    options.headers.Accept = 'application/json'

    /**
     * token的校验
    */
    const token = localStorage.getItem('token')
    token && (options.headers.Authorization = token);

    /**
     * POST请求的处理
    */
    if (/^(POST|PUT)$/i.test(options.method)) {
        !options.type ? options.type = 'urlencoded' : null
        if (options.type === 'urlencoded') {
            options.headers['Content-Type'] = 'application/x-www-form-ulencoded';
            options.body = qs.stringify(options.body)
        }
        if (options.type === 'json') {
            options.headers['Content-Type'] = 'application/json'
            options.body = JSON.stringify(options.body)
        }
    }
    return fetch(url, options).then(response => {
        // 返回的结果可能是非200 状态码
        if (!/^(2|3)\d{2}$/.test(response.status)) {
            switch (response.status) {
                case 401: // 权限
                    break;
                case 403: // 服务理解请求,但拒绝请求
                    localStorage.removeItem('token')
                    break;
                case 404:// 资源文件不存在
                    break;
            }
            return response.json();
        }
    }).catch(error => {
        // 断网处理
        if (!window.navigator.onLine) {
            // 断开网路了, 可以让其跳转到断网网页
            return;
        }

        return Promise.reject(error)
    })

}
