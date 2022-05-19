/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-19 15:34:49
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-19 16:00:16
 * @FilePath: \my-study\React基础学习\my-test\src\pages\layout\layout.js
 */
import React, { Component } from "react";
import TopBar from "./TopBar";
import FooterBar from "./FooterBar";
// todo 组件复合
export default class Layout extends Component {
  render() {
    const { children, showTopBar, showBottomBar, title } = this.props;

    return (
      <div>
        {title}
        {showTopBar && <TopBar />}
        {this.props.children}
        {showBottomBar && <FooterBar />}
      </div>
    );
  }
}
