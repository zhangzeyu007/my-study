/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:23:22
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 10:46:41
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
 * loader:
 * plugin:
 * 
  *
  * 
*/
import { str } from './a.js'

console.log('hello webpack' + `${str}`);
console.log(str);