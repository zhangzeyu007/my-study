/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:56:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 10:43:32
 */

const path = require('path')

// 零配置
module.exports = {
    // 入口
    // 数组形式单入口,但是有两个chunk
    entry: ['./src/index.js', "./src/list.js"],
    // 多入口只能是对象形式
    // entry: {
    //     index: "./src/index.js",
    //     list: "./src/list.js",
    //     detail: "./src/detail.js"
    // },
    // 出口
    output: {
        // 绝对路径
        path: path.resolve(__dirname, './dist'),
        // 多入口占位符
        filename: "[name].js"
    },
    // 打包模式
    mode: "development"
}