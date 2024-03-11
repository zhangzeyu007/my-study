/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-07-13 13:19:11
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-11 13:17:17
 * @FilePath: \my-study\webpack优化与配置\性能优化\lazyLoading_prefetch\webpack.config.js
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const PreloadPlugin = require("webpack-plugin-preload-link");
const PrefetchDNS = require("./prefetch-dns");
/*
    组建懒加载
*/

module.exports = {
  entry: "./src/index.js",
  // 多入口
  // entry: {
  //     main: './src/index.js',
  //     test: './src/test.js',
  // },
  output: {
    filename: "built.[name].[contenthash:5].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
    }),
    //这个插件可以在构建时自动生成 <link rel="preload"> 和 <link rel="dns-prefetch"> 标签。
    //npm install webpack-plugin-preload-link --save-dev
    new PreloadPlugin({
      rel: "dns-prefetch",
      include: "allAssets",
      fileWhitelist: [/\.js$/],
      domains: ["example.com", "cdn.example.com"],
    }),
    new PrefetchDNS({
      prefetchKeys: ["dns-prefetch", "preconnect"],
      domains: ["https://example.com", "https://cdn.example.com"],
    }),
  ],
  mode: "production",
  devtool: "source-map",
  /*
        单入口：可以将 node_modules 中的 js 代码单独打包为一个 chunk 最终输出
        多入口：自动分析多入口中有没有公共文件，如果有，单独打包为一个 chunk
    */
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
