/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-06-06 09:06:56
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-06 10:15:18
 * @FilePath: \my-study\vite学习\zy-vite\plugins\utils.js
 */
async function readBody(stream) {
  // koa 中要求所有的异步方法必须包装成promise
  return new Promise((resolve, reject) => {
    let res = "";
    stream.on("data", (data) => {
      res += data;
    });
    stream.on("end", () => {
      resolve(res); // 将内容解析完成抛出去
    });
  });
}

exports.readBody = readBody;
