/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-14 10:05:37
 * @FilePath: \vue\src\api\user.js
 */
import axios from "@/utils/request";

export function login(data) {
  return axios.post("/user/login", data);
}

export function getInfo() {
  return axios.get("/user/info");
}
