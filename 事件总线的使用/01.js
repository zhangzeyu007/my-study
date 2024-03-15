/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-04-15 17:03:04
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-15 11:48:08
 * @FilePath: \my-study\事件总线的使用\01.js
 */

class Bus {
  constructor() {
    this.events = {};
  }
  $on(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(callback);
  }

  $emit(name, ...args) {
    if (this.events[name]) {
      this.events[name].forEach((callback) => {
        callback(...args);
      });
    }
  }
}

Vue.prototype.$bus = new Bus();
