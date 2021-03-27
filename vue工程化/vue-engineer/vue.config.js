/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 14:48:07
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 16:17:59
 */
const path = require('path')

function addStyleResource(rule) {
    rule.use('style-resource').loader('style-resources-loader')
        .options({
        patterns: [
            path.resolve(__dirname, './src/static/style/import.scss')
        ]
    })
}

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? '/cart/' : '/c',
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', "normal"]
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    }
}