/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 14:48:07
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 16:17:59
 */
const path = require('path')
const cdnDependencies = require('./dependencies.cdn')
const terserPlugin = require('terser-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)
 //  自定义设置
  const customOptions = {
      mozjpeg: {
        progressive: true,
        quality: 50
      },
      optipng: {
        enabled: true,
      },
      pngquant: {
        quality: [0.5, 0.65],
        speed: 4
      },
      gifsicle: {
        interlaced: false,
      },
      // 不支持WEBP就不要写这一项
      webp: {
        quality: 75
      }
  }

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

const cdn = {
    css: cdnDependencies.map(e => e.css).filter(e => e),
    js: cdnDependencies.map(e => e.js).filter(e => e)
}
// console.log(cdn);
module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    devServer: {},
    // css:{
    // // 是否使用css分离插件 ExtractTextPlugin
    // extract: true, // 注释css热更新生效
    // // 开启 CSS source maps?
    // sourceMap: true,
    // // css预设器配置项
    // loaderOptions: {},
    // // 启用 CSS modules for all css / pre-processor files.
    // requireModuleExtension: false
    // },
    configureWebpack: config => {
        if (process.env.NODE_ENV === "development") {
            config.name = 'vue实现'
        } else {
            config.name = 'vue'
        }
         config.entry = {
        'vendor': ['lodash'] // 指定单独打包的第三方库(和CommonsChunkPlugin结合使用)，可以用数组指定多个
    },
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
            ]
        },
         config.optimization ={
           // 我要帮你去做代码分割了
        splitChunks: {
            chunks: 'all',  // 对同步还是异步进行打包，all默认全部打包
            minSize: 30000, // 最小大小，即当抽取的公共模块的大小，大于minSize所设置的值，才起作用
            maxSize: 0, // 可以设置，也可以不设置
            minChunks: 1,// 最小块，即当块的数量大于等于minChunks时，才起作用
            maxAsyncRequests: 6,// 同时加载的模块数量最多几个
            maxInitialRequests: 4,//入口文件里移入的模块，最多分割几个，超出就不进行分割
            automaticNameDelimiter: '~',// 文件名连接符，如果设置了分割的文件名，那么就不会执行
            cacheGroups: {// 缓存组，这里是我们表演的舞台，抽取公共模块什么的，都在这个地方
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, //优先级，只配置在缓存组的每一项，决定执行的顺序。
                    filename:'vendors.js', //代码分割后的文件名 
                },
                default: {// 默认分割的设置
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
         }
    },
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: true
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: [
                        './src/static/styles/resources/*.scss',
                        './src/static/sprites/*.scss'
                    ]
                })
                .end()
        })
        const types = ['vue-modules', 'vue', 'normal-modules', "normal"]
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
        config.plugin('html')
            .tap(args => {
                if (isCDN) {
                    args[0].cdn = cdn
                }
                return args
            })
        // config就是传入的webpack配置的对象
        // 直接对他加工
        // 使用svg icon svg-sprite-loader
        //1.排除掉目前处理svg的rule
        //2.添加一个规则可以打包icons 目录中的svg文件
        config.module
            .rule('svg').exclude.add(resolve('src/static/icons'))
        config.module.rule('icons').test(/\.(svg)(\?.*)?$/).include.add(resolve('src/static/icons')).end()
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' })

            config.module.rule('images') 
        .test(/\.(gif|png|jpe?g|svg)$/i)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options(customOptions)
        .end() 
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
    },
    
}
