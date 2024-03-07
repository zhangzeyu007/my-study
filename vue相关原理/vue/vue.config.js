/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-10-06 18:28:48
 * @LastEditors: 海象
 * @LastEditTime: 2020-12-13 16:45:47
 */
const port = 8080;
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

console.log(process.env.foo);
console.log(process.env.VUE_APP_DONG);
module.exports = {
  // publicPath: "/best-practice", // 部署应⽤包时的基本 URL
  devServer: { port },
  //   configureWebpack: {
  //     // 加一个别名:
  //     resolve: {
  //       alias: {
  //         comps: path.join(__dirname, "src/components")
  //       }
  //     }
  //   },
  configureWebpack: config => {
    // config就是传入的webpack配置对象
    // 直接对他加工, 返回一个也可以
    config.resolve.alias.comps = path.join(__dirname, "src/components");
    if (process.env.NODE_ENV === "development") {
      config.name = "vue项目最佳实战";
    } else {
      config.name = " vue best practice";
    }
  },
  chainWebpack(config) {
    // 使用 svg icon svg-sprite-loader
    //  1.排除掉目前处理svg的rule
    config.module.rule("svg").exclude.add(resolve("src/icons"));
    //  2. 添加一个规则可以打包icons目录中的svg文件
    config.module
      .rule("icons")
      .test(/\.(svg)(\?.*)?$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  }
};
