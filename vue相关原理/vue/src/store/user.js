/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-13 11:41:32
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 13:06:38
 */
import { login, getInfo } from "@/api/user";

const state = {
  token: localStorage.getItem("token"),
  // 其他用户信息
  roles: []
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
  setRoles: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // 模拟用户登录
  login({ commit }, userInfo) {
    return login(userInfo).then(res => {
      commit("setToken", res.data);
      localStorage.setItem("token", res.data);
    });
  },
  getInfo({ commit, state }) {
    return getInfo(state.token).then(({ data: roles }) => {
      commit("setRoles", roles);
      return { roles };
    });
  },
  resetToken({ commit }) {
    // 模拟清空令牌和角色状态
    return new Promise(resolve => {
      commit("setToken", "");
      commit("setRoles", []);
      localStorage.removeItem("token");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
