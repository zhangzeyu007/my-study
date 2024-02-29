/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-01-14 17:36:48
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-01-14 22:03:37
 * @FilePath: \server\app\controller\home.js
 */
const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'zhangzeyu';
  }
}

module.exports = HomeController;
