/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:56:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 09:05:39
 */

const path = require('path')

// 零配置
module.exports = {
    // 入口
    entry: "./src/index.js",
    // 出口
    output: {
        // 绝对路径
        path: path.resolve(__dirname, './dist'),
        filename: "main.js"
    },
    // 打包模式
    mode: "development"
}