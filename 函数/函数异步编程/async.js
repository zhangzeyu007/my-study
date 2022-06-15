/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-06-14 10:38:00
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-14 10:42:25
 * @FilePath: \my-study\函数\异步编程\async.js
 */
const fs = require('fs');

fs.readFile("./age.text", "utf8", (data) => {
  console.log(data);
});
fs.readFile("./name.text", "utf8", (data) => {
  console.log(data);
});
