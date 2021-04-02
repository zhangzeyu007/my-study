/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:56:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-02 16:11:16
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

    // 查找loader处理文件路径位置
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
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "image/",
                        publicPath: '../image/',
                        limit: 1024 * 3 //阈值超过阈值的图片; 会独立文件, 没有超过会处理base64
                    }
                }
            },
            {
                test: /\.(eot|woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: "font/",
                        publicPath: '../font/'
                    }
                }
            }
        ],
    },
    devtool: "source-map", // inline-source-map cheap-source-map none
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        proxy: {
            "/api": {
                target: ""
            }
        }
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