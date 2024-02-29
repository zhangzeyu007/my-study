/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-01-14 17:36:48
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-01-21 16:05:56
 * @FilePath: \server\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1705225005394_1621';

  // add your middleware config here
  config.middleware = [];

  // 安全性相关的配置
  config.security = {
    csrf: {
      enable: false, // 默认情况下启用 CSRF 防护，可设置为 false 禁用
    },
    // 其他安全配置...
  };

  config.io = {
    init: {
      wsEngine: 'ws',
    }, // 传递给 Socket.IO 的初始化参数
    namespace: {
      '/': {
        connectionMiddleware: [ 'auth' ], // 连接中间件列表
        packetMiddleware: [], // 数据包中间件列表
      },
    },
  };

  config.cluster = {
    listen: {
      port: 7001, // 默认7001，根据需要设定端口号
    },
  };

  config.cors = {
    origin: '*', // 或者一个具体的 URL
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true, // 注意设置这个，以支持 withCredentials
  };
  // 日志配置
  config.logger = {
    level: 'INFO', // 控制记录的日志级别
    consoleLevel: 'INFO', // 控制写入 console 的日志级别
    // 其他日志相关配置...
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
