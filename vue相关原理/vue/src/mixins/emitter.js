/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-10-08 10:54:14
 * @LastEditors: 海象
 * @LastEditTime: 2020-10-08 12:33:04
 */
//广播: 子上面下派发事件
function broadcast(componentName, eventName, params) {
  // 遍历所有的子元素, 如果子元素componentName 和传入的相同则派发事件
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    // 冒泡查找componentName相同的组件并派发事件
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
