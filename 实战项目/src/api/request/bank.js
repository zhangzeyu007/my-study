/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-30 09:32:17
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-30 09:52:50
 */
import axios from "../http";

function getBankData() {
  return axios.get("/api/bankdata");
}

export default {
  getBankData,
};
