/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-13 14:36:13
 * @LastEditors: 海象
 * @LastEditTime: 2020-12-15 17:24:32
 */
import { asyncRoutes, constRoutes } from "@/router";

const state = {
  routes: [], // 完整路由表
  addRoutes: [] // 用户可访问路由表
};

const mutations = {
  setRoutes: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constRoutes.concat(routes);
  }
};

const actions = {
  // 路由生成: 在得到用户角色后会第一时间调用
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 根据角色做过滤处理
      const accessedRoutes = fillterAsyncRoutes(asyncRoutes, roles);
      commit("setRoutes", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表，首次传入的就是AsyncRoutes
 * @roles 用户拥有角色
 */

export function fillterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    // 复制一份, 防止用户切换角色
    const tmp = { ...route };
    // 如果用户有访问权则加入结果路由表
    if (hasPermission(roles, tmp)) {
      // 如果存在子路由则递归过滤
      if (tmp.children) {
        tmp.children = fillterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}
/**
 * 根据路由meta.role 确定是否当前用户拥有访问权限
 *
 * @roles 用户角色
 * @route 待判定路由
 *
 */

function hasPermission(roles, route) {
  // 如果当前路由有roles字段则需判断用户权限
  if (route.meta && route.meta.roles) {
    // 若用户拥有的角色中有被包含在待判定路由角色表中的则拥有访问权
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    // 没有设置roles 则无需判定即可访问
    return true;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
