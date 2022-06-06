/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-06-06 08:18:42
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-06 15:35:49
 * @FilePath: \my-study\vite学习\zy-vite\plugins\moduleRewritePlugin.js
 */
const { readBody } = require("./utils");
const { parse } = require("es-module-lexer"); // 解析import 语法
const MagicString = require("magic-string"); // 因为字符串具有不变性

function rewriteImports(source) {
  let imports = parse(source)[0];
  let magicString = new MagicString(source); // overwrite()
  if (imports.length) {
    // 对 import 语法进行拦截
    // 说明有多条import语法
    for (let i = 0; i < imports.length; i++) {
      console.log(imports[i]);
      let { s, e } = imports[i];
      let id = source.substring(s, e); // vue ./app
      // 当前开头是 \ 或者 . 不需要重写
      if (/^[^\/\.]/.test(id)) {
        id = `/@modules/${id}`; // 标识这个模块是第三方模块
        magicString.overwrite(s, e, id);
      }
    }
  }
  console.log(magicString.toString());
  return magicString.toString(); // 将替换后的结果返回增加/@module 浏览器会再次发送请求, 服务器要拦截 带有/@moudules 前缀的请求 进行处理
}

function moduleRewritePlugin({ app, root }) {
  // 启动项目时的根路径
  app.use(async (ctx, next) => {
    await next();
    // 在这里完善了自己的逻辑

    // 获取流中的数据
    if (ctx.body && ctx.response.is("js")) {
      let content = await readBody(ctx.body);
      // 重写内容 将重写后的结果返回回去
      //   console.log(content);
      const result = rewriteImports(content);

      ctx.body = result; // 将内容重写并返回
    }
  });
}

exports.moduleRewritePlugin = moduleRewritePlugin;
