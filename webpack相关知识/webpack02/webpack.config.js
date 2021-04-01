/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:56:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 17:38:54
 */

const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    resolveLoader: {
        modules: ['node_modules', './myLoader']
    },
    // loader的设置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader", 'less-loader']
            },
            {
                test: /\.js$/,
                use: [
                    "replace-loader",
                    {
                        loader: path.resolve(__dirname, './myLoader/replace-loader-async.js'),
                        options: {
                            name: '张泽雨'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        })
    ]
}