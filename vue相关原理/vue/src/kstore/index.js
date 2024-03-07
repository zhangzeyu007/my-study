/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-07 12:55:30
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-07 18:36:07
 * @FilePath: \my-study\vue相关原理\vue\src\kstore\index.js
 */

import Vue from "vue";
import Vuex from "./kvuex";

console.log(Vuex);
Vue.use(Vuex);

/*
实现插件
   实现Store类
    维持一个响应状态state
    实现commit()
    实现dispatch()
    getters
挂载$store

*/

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    // 如何获取
    add(state, num = 1) {
      state.counter += num;
    }
  },
  actions: {
    add({ commit }) {
      // 此处上下文是什么
      setTimeout(() => {
        commit("add");
      }, 1000);
    }
  },
  modules: {}
});
