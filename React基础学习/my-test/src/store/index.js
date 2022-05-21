/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-21 09:38:27
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-21 09:58:12
 * @FilePath: \my-study\React基础学习\my-test\src\store\index.js
 */
import { createStore } from "redux";

// 定义state 初始化和修改规则

function counterReducer(state = 0, action) {
  console.log(state);
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counterReducer);

export default store;
