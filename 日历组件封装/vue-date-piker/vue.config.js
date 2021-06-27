/**
 * *@2018-10-08
 * *@author trsoliu
 * *@describe vue-cli 3.x配置文件
 */
const path = require('path');

module.exports = {
 //基本路径
 //baseUrl: './',//vue-cli3.3以下版本使用
 //vue-cli3.3+新版本使用
 publicPath:'./',

 //输出文件目录
 outputDir: 'dist-build',

 // eslint-loader 是否在保存的时候检查
 lintOnSave: true,

 //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
 assetsDir: 'static',

 //以多页模式构建应用程序。
 pages: undefined,

 //是否使用包含运行时编译器的 Vue 构建版本
 runtimeCompiler: false,

 css:{
   loaderOptions:{

   },
 },

 pluginOptions: {
   'style-resources-loader': {
     preProcessor: 'less',
     patterns: [
        path.resolve(__dirname, './src/assets/common/global.less')
     ]
   }
 }
};
