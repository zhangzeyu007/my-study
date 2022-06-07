/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-06-06 15:37:19
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-07 16:55:07
 * @FilePath: \my-study\vite学习\zy-vite\plugins\serverPluginModuleResolved.js
 */

const moduleREG = /^\/@modules\//;
const fs = require("fs").promises;
const path = require("path");

function resolveVue(root) {
  // todo vue3 由 几部分组成 runtime-dom runtime-core reactivity  shared , 在后端中解析 .vue 文件 compiler-sfc
  // todo 编译是在后端实现的, 所以我需要拿到的文件是commonjs规范的
  const compilerPkgPath = path.join(
    root,
    "node_modules",
    "@vue/compiler-sfc/package.json"
  );

  const compilerPkg = require(compilerPkgPath); // todo 获取json中的内容
  // node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js
  const compilerPath = path.join(
    path.dirname(compilerPkgPath),
    compilerPkg.main
  );

  const resolvePath = (name) =>
    path.resolve(
      root,
      "node_modules",
      `@vue/${name}/dist/${name}.esm-bundler.js`
    );

  const runtimeDomPath = resolvePath("runtime-dom");
  const runtimeCorePath = resolvePath("runtime-core");
  const reactivityPath = resolvePath("reactivity");
  const sharedPath = resolvePath("shared");

  // todo esmModule 模块
  return {
    compiler: compilerPath, // todo 用于稍后后端进行编译的文件路径
    "@vue/runtime-dom": runtimeDomPath,
    "@vue/runtime-core": runtimeCorePath,
    "@vue/reactivity": reactivityPath,
    "@vue/shared": sharedPath,
    vue: runtimeDomPath,
  };
}

function moduleResolvedPlugin({ app, root }) {
  const vueResolved = resolveVue(root); // todo 根据当前运行vite 的目录解析出一个文件表来,包含着vue中的所有的模块

  app.use(async (ctx, next) => {
    console.log(ctx.path);
    if (!moduleREG.test(ctx.path)) {
      // todo 处理当前的请求的路径, 是否以/@modules 开头的
      await next();
    }
    // todo 将/@modules 替换掉 /@modules/vue
    const id = ctx.path.replace(moduleREG, ""); // vue

    ctx.type = "js"; // todo 设置响应类型 响应结果是js类型

    // todo  应该去当前项目下查找 vue 对应的真实的文件
    // TODO:这里有问题
    const content = await fs.readFile(vueResolved[id], "utf8");
    console.log(content);
    ctx.body = content; // todo 返回读取出来的结果
  });
}

exports.moduleResolvedPlugin = moduleResolvedPlugin;
