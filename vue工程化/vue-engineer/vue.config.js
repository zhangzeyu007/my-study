/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 14:48:07
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 16:17:59
 */
const path = require('path')
const cdnDependencies = require('./dependencies.cdn')

function addStyleResource(rule) {
    rule.use('style-resource').loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/static/style/import.scss')
            ]
        })
}
// CDN 相关
const isCDN = process.env.VUE_APP_CDN == 'ON'
console.log(process.env.VUE_APP_CDN);
console.log(isCDN);
const cdn = {
    css: cdnDependencies.map(e => e.css).filter(e => e),
    js: cdnDependencies.map(e => e.js).filter(e => e)
}
console.log(cdn);
module.exports = {
    // publicPath: process.env.NODE_ENV === "production" ? '/cart/' : '/c',
    devServer: {},
    configureWebpack: config => {
        if (process.env.NODE_ENV === "development") {
            config.name = 'vue实现'
        } else {
            config.name = 'vue'
        }
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', "normal"]
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
        config.plugin('html')
            .tap(args => {
                if (isCDN) {
                    args[0].cdn = cdn
                }
                return args
            })
    },
}
