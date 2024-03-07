/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-11-02 19:40:28
 * @LastEditors: 海象
 * @LastEditTime: 2020-11-03 16:00:42
 */
// 自动加载sbg目录中的svg文件,
// context()返回的函数式指定了上下文路径的require函数
const req = require.context("./svg", false, /\.svg$/);
import SvgIcon from "@/components/SvgIcon";
import Vue from "vue";

// keys返回文件名数组,map遍历所有文件并使用req加载它们
// console.log(req.keys());
req.keys().map(req);
// 全局注册一下SvgIcon组件
Vue.component("svg-icon", SvgIcon);
