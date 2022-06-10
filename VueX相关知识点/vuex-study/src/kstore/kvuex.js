/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-06-09 14:34:59
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-09 17:42:40
 * @FilePath: \my-study\VueX相关知识点\vuex-study\src\kstore\kvuex.js
 */

// 1. 实现插件
class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;
    // 创建响应式的state
    // this.$store.state.xx
    this._vm = new _Vue({
      data() {
        return {
          // 不希望被代理, 就加上$
          $$state: options.state,
        };
      },
    });
    // 修改this 的 指向
  }
  get state() {
    return this._vm._data.$$state;
  }
  set state(v) {
    console.error("please use replaceState to reset state");
  }
  // 修改 state
  // this.$store.commit('add', 1)
  commit(type, payload) {
    // 获取type 对应的 mutation
    const entry = this._mutations[type];
    if (!entry) {
      console.log("unknown mutaion");
    }
    // 传入state 作为参数
    entry(this.state, payload);
  }
  dispatch(type, payload) {
    //获取type 对应的action
    const fn = this._actions[type];

    if (!fn) {
      console.log("unknown aciton");
    }
    // 传入当前 Store 实例做上下文
    return fn(this, payload)
  }
}

function install(Vue) {
  _Vue = Vue;

  // 混入
  Vue.mixin({
    beforeCreate() {
      if (this.$options.Store) {
        Vue.prototype.$store = this.$options.Store;
      }
    },
  });
}

// 导出的对象就是Vuex
export default {
  Store,
  install,
};
