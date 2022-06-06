const Koa = require("koa");
const { serveStaticPlugin } = require("./plugins/serverPluginServeStatic");
const { moduleRewritePlugin } = require("./plugins/serverPluginModuleRewrite");
const { moduleResolvedPlugin} = require("./plugins/serverPluginModuleResolved");

function createServer() {
  const app = new Koa(); // 创建一个koa 实例
  const root = process.cwd();
  // 当用户运行 npm run my-dev时 会创建服务
  const context = {
    app,
    root, // 当前根的位置
  };
  // koa 是基于中间件运行的
  const resolvedPlugins = [
    // 插件的集合
    // 3) 解析以 /@modules 文件开头的内容, 找到对应的结果
    moduleResolvedPlugin,
    // 2) 解析import重写路径
    moduleRewritePlugin, // 功能是读取文件将文件的结果放到了ctx.body上
    // 1) 要实现静态服务的功能
    serveStaticPlugin,
  ];
  resolvedPlugins.forEach((plugin) => plugin(context));

  return app; // 返回 app 中有listen 方法
}

module.exports = createServer;
