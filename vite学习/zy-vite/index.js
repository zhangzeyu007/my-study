const Koa = require("koa");

function createServer() {
  const app = new Koa();
  // 当用户运行 npm run my-dev时 会创建服务

  return app; // 返回 app 中有listen 方法
}

module.exports = createServer;
