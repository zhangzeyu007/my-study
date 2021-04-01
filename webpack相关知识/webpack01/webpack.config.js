/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:56:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 09:02:57
 */

const path = require('path')

// 零配置
module.exports = {
    entry: "./src/index.js",
    output: {
        // 绝对路径
        path: path.resolve(__dirname, './dist'),
        filename: "main.js"
    },
    mode: "development"
}