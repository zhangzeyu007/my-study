/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2021-07-13 13:19:11
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-09 19:18:14
 * @FilePath: \my-study\webpack优化与配置\配置详解\entry\webpack.config.js
 */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

/*
    入口: entry (string | arr | JOSN)
        string: 1个 chunk, 1个 bundle (单入口配置)
        arr: 多个入口, 1个 chunk, 1个 bundle (多入口配置)
        JOSN: 有几个 key 就有几个 chunk, 同时也会有几个 bundle
        key 就是 chunk 的名称 (多入口, 多出口)

*/

module.exports = {
    // entry: './src/index.js',
    // entry: [
    //     './src/index.js',
    //     // './src/add.js',
    // ],
    entry: {
        index: ['./src/index.js', './src/subtract.js'],
        add: './src/add.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new HTMLWebpackPlugin()
    ],
    mode: "development"
}

