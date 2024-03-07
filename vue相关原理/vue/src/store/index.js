/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 15:27:35
 * @FilePath: \vue\src\store\index.js
 */

import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import permission from "./permission";

Vue.use(Vuex);

/*
实现插件
   实现Store类
    维持一个响应状态state
    实现commit()
    实现dispatch()
    getters
挂载 $store
*/

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    },
    roles: state => state.user.roles,
    hasRoles: state => state.user.roles && state.user.roles.length > 0,
    permission_routes: state => state.permission.routes
  },
  mutations: {
    // 如何获取
    add(state) {
      state.counter++;
    },
    min(state) {
      state.counter--;
    }
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
    min({ commit }) {
      setTimeout(() => {
        commit("min");
      }, 1000);
    }
  },
  modules: {
    user,
    permission
  }
});
