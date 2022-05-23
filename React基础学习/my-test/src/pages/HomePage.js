/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-19 16:17:20
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-21 13:43:07
 * @FilePath: \my-study\React基础学习\my-test\src\pages\HomePage.js
 */

import React, { Component } from "react";
import Layout from "../pages/layout/Layout";
import store from "../store/index";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
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
          <Router>
            <Link to="/">首页</Link>
            <Link to="/user">用户中心</Link>
            <Route exact path="/" component={AboutPage} />
            <Route path="/user" component={UserPage} />
          </Router>
        </Layout>
      );
    }
  }
);

class UserPage extends Component {
  render() {
    return <div>UserPage hahada</div>;
  }
}

class AboutPage extends Component {
  render() {
    return <div>AboutPage</div>;
  }
}
