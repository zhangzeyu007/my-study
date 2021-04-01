/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 17:46:47
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 17:56:50
 */
// 使用less模块处理less语法

const less = require('less')
module.exports = function (source) {
    less.render(source, (e, output) => {
        let { css } = output
        this.callback(e, css)
    })
}