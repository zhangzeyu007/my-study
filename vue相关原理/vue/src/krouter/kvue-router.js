/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 15:39:39
 * @FilePath: \vue\src\krouter\kvue-router.js
 */
// 实现一个插件
// 返回一个函数
// 或者返回一个对象,他有一个install方法
let _Vue;
class VueRouter {
  // 选项:routes - 路由表
  constructor(options) {
    this.$options = options;

    // 缓存path 和 route映射关系
    this.routeMap = {};
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route;
    });

    // 需要定义一个响应式的current属性
    const initial = window.location.hash.slice(1) || "/";
    _Vue.util.defineReactive(this, "current", initial);

    // 监控url变化
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }

  onHashChange() {
    // 只要#后面部分
    this.current = window.location.hash.slice(1);
  }
}

// 接收一个Vue的构造函数
VueRouter.install = function(Vue) {
  // 引用Vue构造函数,在上面VueRouter中使用
  _Vue = Vue;
  // 1. 挂载$router
  Vue.mixin({
    beforeCreate() {
      // 此处的this值的是组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });

  // 2.定义两个全局组件router-link, router-view
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        require: true
      }
    },
    render(h) {
      // console.log(this.$slots.default);
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to
          }
        },
        this.$slots.default
      );
    }
  });
  Vue.component("router-view", {
    render(h) {
      // 找到当前url对应的组件
      const { routeMap, current } = this.$router;
      const component = routeMap[current] ? routeMap[current].component : null;

      // const route = this.$router.$options.routes.find(
      //   route => route.path === this.$router.current
      // );
      // if (route) {
      //   component = route.component;
      // }
      // 渲染传入组件
      return h(component);
    }
  });
};

export default VueRouter;
