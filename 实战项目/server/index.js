/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-30 09:10:17
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-30 13:36:02
 */
const express = require("express");
const app = express();
app.all("", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "");
  next();
});
app.get("/api/courses", (req, res) => {
  res.json([]);
});
app.listen(3000);
