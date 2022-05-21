/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-19 16:17:20
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-21 10:19:08
 * @FilePath: \my-study\React基础学习\my-test\src\pages\HomePage.js
 */

import React, { Component } from "react";
import Layout from "../pages/layout/Layout";
import store from "../store/index";

export default class HomePage extends Component {
  componentDidMount() {
    // 订阅
    store.subscribe(() => {
      console.log("state发生变化了");
      // 页面强制更新方法
      this.forceUpdate();
    });
  }
  render() {
    return (
      <Layout>
        {/* 获取状态 */}
        <p>{store.getState()}</p>
        <button onClick={() => store.dispatch({ type: "ADD" })}>添加</button>
      </Layout>
    );
  }
}
