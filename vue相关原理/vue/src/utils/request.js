/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-07 12:55:30
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-25 16:36:14
 * @FilePath: \my-study\vue相关原理\vue\src\utils\request.js
 */
import Axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";

// 创建axios实例
const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url基础地址
  // withCredentials: true, // 跨域时若要发送cookies需设置该选项
  timeout: 5000, // 超时
});

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // 设置令牌请求头
      config.headers["Authorization"] = "zzy" + token;
    }
    return config;
  },
  (error) => {
    // 请求错误 预处理
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  // 通过自定义code 判断响应状态, 也可以通过HTTP状态码判定
  (response) => {
    // 仅返回数据部分
    const res = response.data;

    // code 不为1则判定为一个错误
    if (res.code !== 1) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });
      // 假设：10008-非法令牌; 10012-其他客户端已登录; 10014-令牌过期;
      if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
        MessageBox.confirm("登录状态异常, 请重新登录", "确认登录信息", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default axios;
