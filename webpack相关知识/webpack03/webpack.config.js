/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:56:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-02 09:31:42
 */

const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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

    // 查找loader 处理文件路径位置
    resolveLoader: {
        modules: ['node_modules']
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
                test: /\.(jpe?g|png|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "image/[name].[ext]"
                    }
                }
            }
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CleanWebpackPlugin()
    ]
}