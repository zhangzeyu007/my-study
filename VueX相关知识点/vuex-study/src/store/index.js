/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2021-03-27 10:32:33
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-26 10:00:01
 * @FilePath: \my-study\VueX相关知识点\vuex-study\src\store\index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import persist from './plugins/persist'

Vue.use(Vuex)

export default new Vuex.Store({
  // 模块使用
  modules: {
    user
  },
  // 严格模式打开
  strict: true,
  // 注册vux插件
  plugins: [persist]
})
