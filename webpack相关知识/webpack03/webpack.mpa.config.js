/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:56:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-02 17:58:14
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')

const setMpa = () => {
    const entry = {}
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
    entryFiles.map((item, index) => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js$/)
        console.log(match);
        const pageName = match[1]
        entry[pageName] = entryFile
        htmlWebpackPlugins.push(new htmlWebpackPlugin({
            template: `./src/${pageName}/index.html`,
            filename: `${pageName}.html`,
            chunks: [pageName]
        }))
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMpa()

// 零配置
module.exports = {
    entry,
    // 出口
    output: {
        // 绝对路径
        path: path.resolve(__dirname, './mpa'),
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
    plugins: [
        ...htmlWebpackPlugins,
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CleanWebpackPlugin()
    ]
}