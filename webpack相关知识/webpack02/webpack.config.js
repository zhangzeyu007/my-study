/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:56:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 14:28:41
 */

const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
// 零配置
module.exports = {
    // 入口
    entry: "./src/index.js",
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
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', "postcss-loader", 'less-loader']
            }
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ]
}