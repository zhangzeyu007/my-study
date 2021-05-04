/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-27 19:44:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-05-04 14:53:59
 */

module.exports = {
  publicPath: "./",
  // 基础配置
  devServer: {
    before(app) {
      app.get("/api/bankdata", (req, res) => {
        res.json([
          {
            id: 1,
            title: "华夏银行建国支行",
            imgUrl:
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3433698837,2014417676&fm=26&gp=0.jpg",
            site: "杭州市建国北路21号",
          },
          {
            id: 2,
            title: "华夏银行建国支行",
            imgUrl:
              "https://img1.baidu.com/it/u=581770746,3965827973&fm=26&fmt=auto&gp=0.jpg",
            site: "杭州市建国北路21号",
          },
          {
            id: 3,
            title: "华夏银行建国支行",
            imgUrl:
              "https://img1.baidu.com/it/u=581770746,3965827973&fm=26&fmt=auto&gp=0.jpg",
            site: "杭州市建国北路21号",
          },
        ]);
      });
    },
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     ws: true,
    //     changeOrigin: true,
    //   },
    // },
  },
  chainWebpack(config) {
    config.output.globalObject("this");
  },
  pluginOptions: {},
  lintOnSave: false,
};
