/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-15 17:03:04
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-15 17:28:29
 */
class Bus {
    constructor() {
        this.callbacks = {}
    }
    $emit(name, fn) {
        this.callbacks[name] = this.callbacks[name] || []
        this.callbacks[name].push(fn)
    }
    $on(name, args) {
        if (this.callbacks[name]) {
            this.callbacks[name].forEach(cb => cb(args))
        }
    }
}

Vue.prototype.$bus = new Bus()