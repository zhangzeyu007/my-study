/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:56:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 11:45:09
 */

const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
// 零配置
module.exports = {
    // 入口
    entry: "./src/index.js",
    // 数组形式单入口,但是有两个chunk
    // entry: ['./src/index.js', "./src/list.js"],
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
    mode: "development",
    // loader的设置
    module: {
        rules: [
            {
                test: /\.css$/,
                // css-loader => webpack 支持.css 模块的语法
                // style-loader => 把 css的代码抽离出来 ,动态生成style标签,插入到html的头部
                // 然后再把css放入进去
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ]
}