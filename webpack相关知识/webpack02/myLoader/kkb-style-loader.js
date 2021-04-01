/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 17:46:35
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 17:55:12
 */
module.exports = function (source) {
    // style
    // style = { source}
    // style => head
    return `
    const tag = document.createElement('style')
    tag.innerHTML = ${source}
    document.head.appendChild(tag)
    `
}