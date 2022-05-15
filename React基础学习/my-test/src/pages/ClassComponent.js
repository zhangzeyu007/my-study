/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-15 13:23:08
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-15 13:36:34
 * @FilePath: \my-study\React基础学习\my-test\src\pages\ClassComponent.js
 */

import React, { Component } from "react";

export default class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }
  // 组件挂载完成之后执行
  componentDidMount() {
	  
  }
  render() {
    const { date } = this.state;
    return (
      <div>
        <h3>{date.toLocaleTimeString()}</h3>
      </div>
    );
  }
}
