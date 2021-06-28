
const path = require('path')
const cdnDependencies = require('./dependencies.cdn')
const terserPlugin = require('terser-webpack-plugin')

// CDN 相关
const isCDN = process.env.VUE_APP_CDN == 'ON'

const cdn = {
    css: cdnDependencies.map(e => e.css).filter(e => e),
    js: cdnDependencies.map(e => e.js).filter(e => e)
}
module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    devServer: {},
        //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    configureWebpack: config => {
      if (process.env.NODE_ENV === "development") {
            config.name = 'vue实现'
        } else {
            config.name = 'vue'
        }
            config.optimization = {
            minimizer: [
                new terserPlugin({
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        }
                    }
                })
            ],

        }
    },
    chainWebpack: config => {
            config.plugin('html')
            .tap(args => {
                args[0].title = process.env.VUE_APP_TITLE
                if (isCDN) {
                    args[0].cdn = cdn
                }
                args[0].debugTool = process.env.VUE_APP_DEBUG_TOOL
                args[0].appType = process.env.VUE_APP_TYPE
                return args
            })
    }
}
