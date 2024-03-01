/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-01-14 17:36:48
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-01-14 18:06:18
 * @FilePath: \server\config\plugin.js
 */
/** @type Egg.EggPlugin */

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
