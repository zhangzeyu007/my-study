/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-19 16:17:20
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-21 11:51:00
 * @FilePath: \my-study\React基础学习\my-test\src\pages\HomePage.js
 */

import React, { Component } from "react";
import Layout from "../pages/layout/Layout";
import store from "../store/index";
import { connect } from "react-redux";

export default connect(
  // mapStateToProps 映射到 props
  (state) => ({ num: state }),
  // mapDispatchToProps 把 dispatch 映射到 props
  {
    add: () => ({ type: "ADD" }),
  }
)(
  class HomePage extends Component {
    componentDidMount() {
      // 订阅
      store.subscribe(() => {
        console.log("state发生变化了");
        // 页面强制更新方法
        this.forceUpdate();
      });
    }
    render() {
      console.log("props", this.props);
      const { num, dispatch, add } = this.props;
      return (
        <Layout>
          {/* 获取状态 */}
          <p>{store.getState()}</p>
          <h2>{num}</h2>
          <button onClick={() => store.dispatch({ type: "ADD" })}>添加</button>
          {/* <button onClick={() => dispatch({ type: "ADD" })}>添加++++++</button> */}
          <button onClick={() => add()}>新增</button>
        </Layout>
      );
    }
  }
);
