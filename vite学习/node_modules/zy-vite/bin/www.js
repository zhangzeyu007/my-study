#! /usr/bin/env node
// 可以运行的脚本
console.log("zzy-vite");

// 创建一个koa的服务
const createServer = require("../index");
createServer().listen(4000, () => {
  console.log("server strat 4000 pord");
});
