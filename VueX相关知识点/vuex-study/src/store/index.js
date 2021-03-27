/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 10:32:33
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 12:38:04
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import persist from './plugins/persist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  // 严格模式打开
  strict: true,
  // 注册vux插件
  plugins: [persist]
})
