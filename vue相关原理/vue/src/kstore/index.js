/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-10-06 18:06:45
 * @LastEditors: 海象
 * @LastEditTime: 2020-10-13 00:47:37
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
