
const path = require('path')
const cdnDependencies = require('./dependencies.cdn')
const terserPlugin = require('terser-webpack-plugin')
const  CompressionPlugin = require('compression-webpack-plugin')
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
    assetsDir: '',
    configureWebpack: config => {
      if (process.env.NODE_ENV === "development") {
            config.name = 'vue实现'
        } else {
            config.name = 'vue'
        }
            config.optimization = {
            minimizer: [
                new terserPlugin({
                // 开启缓存
                cache: true,
                // 开启多进程打包
                parallel: true,
                // 如果需要 sourceMap 这里一定要设置为 true
                sourceMap: true,
                })
            ]
        }
     return {
      plugins:[
      new CompressionPlugin({
        filename: "[path].gz",
        //压缩算法
        algorithm: "gzip",
        //匹配文件
        test: /\.js$|\.css$|\.html$/,
        //压缩超过此大小的文件,以字节为单位
        threshold: 10240,
        minRatio: 0.8,
        //删除原始文件只保留压缩后的文件
        deleteOriginalAssets: false
      })
    ]
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
