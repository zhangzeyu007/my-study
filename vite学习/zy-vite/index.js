const Koa = require("koa");
const { serverStaticPlugin } = require("./plugins/serverPluginServerStatic");
function createServer() {
  const app = new Koa(); // 创建一个koa 实例
  const root = process.cwd();
  // 当用户运行 npm run my-dev时 会创建服务
  console.log(root);
  const context = {
    app,
    root, // 当前根的位置
  };
  // koa 是 基于中间件运行的
  const resolvedPlugins = [
    // 插件的集合
    // 1) 要实现静态服务的功能
    serverStaticPlugin,
    // 2) 解析import重写路径
  ];
  resolvedPlugins.forEach((plugin) => plugin(context));
  return app; // 返回 app 中有listen 方法
}

module.exports = createServer;
