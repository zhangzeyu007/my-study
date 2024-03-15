/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-04-15 17:03:04
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-14 22:44:09
 * @FilePath: \my-study\事件总线的使用\01.js
 */

class Bus {
  constructor() {
    this.callbacks = {};
  }
  $emit(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $on(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach((cb) => cb(args));
    }
  }
}

Vue.prototype.$bus = new Bus();
