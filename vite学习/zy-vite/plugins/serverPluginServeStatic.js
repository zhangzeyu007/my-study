/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-06-05 22:57:52
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-06 15:12:38
 * @FilePath: \my-study\vite学习\zy-vite\plugins\servePluginServeStatic.js
 */

const static = require("koa-static");
const path = require("path");

function serveStaticPlugin({ app, root }) {
  // vite 在哪里运行 就在哪个目录启动静态服务
  app.use(static(root));
  // 以 public 作为静态服务
  app.use(static(path.join(root, "public")));
}

// 导出静态服务插件
exports.serveStaticPlugin = serveStaticPlugin;
