/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 10:32:33
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 11:22:20
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  }
})
