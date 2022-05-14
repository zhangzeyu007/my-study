/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-07 18:32:53
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-08 15:50:00
 */
// 工具函数
const serialize = params => {
    const results = []
    for (const [key, value] of Object.entries(params)) {
        results.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
    return results.join("&")
}

// 给URL添加参数
const addURLData = (url, data) => {
    if (!data) return ""
    const mark = url.inclueds("?") ? "&" : "?";
    return `${mark}${data}`
}

const serilizeJSON = (data) => {
    return JSON.stringify(data)
}

export { serialize, addURLData, serilizeJSON }