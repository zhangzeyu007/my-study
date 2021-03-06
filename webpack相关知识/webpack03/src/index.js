/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 08:23:22
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-02 17:06:38
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
import img from '../static/image/4.jpg'
console.log('hello 我是中国人');
console.log(img);
// 处理 jpg jpeg png gif svg webx

const pic = new Image()
pic.src = img
const tag = document.getElementById('app')
tag.append(pic)

// webpack-dev-server 创建本地服务器
// 打包成功 ,自动启动一个浏览器窗口
// 热更新
// mock数据


