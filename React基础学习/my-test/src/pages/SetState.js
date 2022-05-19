/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-19 14:14:01
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-19 14:38:14
 * @FilePath: \my-study\React基础学习\my-test\src\pages\SetState.js
 */

import React, { Component } from "react";

export default class SetState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  componentDidMount() {
    // this.changeValue(2);
  }
  // 方法
  changeValue = (v) => {
    // setState 在合成事件和生命周期中是异步的, 这里说的异步是批量更新, 达到了性能优化的目的
    this.setState({ counter: this.state.counter + v }, () => {
      // callback 就是state 更新完成之后再执行
      console.log("counterCallback", this.state.counter);
    });
  };
  //
  setCounter = () => {
    //setState在setTimeOut和原生事件中是同步的
    setTimeout(() => {
      this.changeValue(1);
    }, 0);
    // this.changeValue(1);
  };
  // 渲染函数jsx
  render() {
    return (
      <div>
        <h3>setState</h3>
        <button onClick={this.setCounter}>{this.state.counter}</button>
      </div>
    );
  }
}
