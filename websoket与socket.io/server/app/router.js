/*
 * @Description: 11
 * @Author: 张泽雨
 * @Date: 2024-01-14 17:36:48
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-02-14 12:35:08
 * @FilePath: \server\app\router.js
 */
/**
 * @param {Egg.Application} app - egg application
 */


module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  // 定义命名空间
  io.of('/').route('message', io.controller.home.index);
};
