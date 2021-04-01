/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:23:22
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 17:32:14
 */
/**
 *  npm  init -y 初始化npm 配置文件
 *  npm install --save-dev webpack@4.44.0 安装核心库
 *  npm install --save-dev webpack-cli@3.3.12 安装命令行工具
 *  npm i -D webpack@4.44.0 安装指定版本
 *  npx webpack 执行构建
 * 
 * webpack 配置核心概念
 * chunk 指代码块,一个chunk可能由多个模块组成,也用于代码块的分割;
 * bundle :资源经过webpack 流程解析编译后最终输出的成果文件
 * Bundle 对应一个chunk 包含一个模块chunk 或多个模块chunk
 * entry: 入口文件;webpack依赖图谱的起点
 * output: webpack打包输出的配置
 * loader:不支持的文件类型,loader机制进行完善
 * plugin:webpack功能扩展补充
 * 
  *
  * 
*/

import './index.css'
import './index.less'
console.log('hello 我是中国人');

//自动补齐浏览器前缀
//px to rem
//css 压缩 postcss  === bable => JS
//css 内容 => ast => 编译 postcss的插件来处理的
//postcss-use 允许您在CSS中显式设置PostCSS插件，并仅对当前文件执行它们。 
//postcss-initial添加了all: initial支持，这将重置所有继承的样式。
//autoprefixer 使用“我可以使用”中的数据添加供应商前缀。
// postcss-loader

