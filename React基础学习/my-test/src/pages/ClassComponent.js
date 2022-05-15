/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-15 13:23:08
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-15 13:46:59
 * @FilePath: \my-study\React基础学习\my-test\src\pages\ClassComponent.js
 */

import React, { Component } from "react";

export default class ClassComponent extends Component {
  constructor(props) {
    super(props);
    // 储存状态
    this.state = {
      date: new Date(),
    };
  }
  // 组件挂载完成之后执行
  componentDidMount() {
    this.timer = setInterval(() => {
      // 更新state , 不能 this.state
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }

  // 组件卸载之前执行
  componentWillUnmount() {
    clearInterval(this.timer);
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
