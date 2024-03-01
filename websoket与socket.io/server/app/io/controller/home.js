/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-01-14 18:24:33
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-02-16 11:01:29
 * @FilePath: \server\app\io\controller\home.js
 */

let timer = null;
module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const message = this.ctx.args[0];
      console.log('消息:', message);
      const _this = this;
      let count = 0;
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        count++;
        _this.ctx.socket.emit('count', count);
      }, 1000);

    }
  };
};
