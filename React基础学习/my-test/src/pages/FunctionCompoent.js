/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-15 13:49:17
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-19 13:58:32
 * @FilePath: \my-study\React基础学习\my-test\src\pages\FunctionCompoent.js
 */

import React, { useState, useEffect } from "react";

export default function FunctionCompoent(props) {
  const [date, setDate] = useState(new Date());
  // 相当于 componentDidMount componentWillUnmount componentDidUpdate
  useEffect(() => {
    console.log("useEffect");
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h3>Funciton Component</h3>
      <h2>{date.toLocaleTimeString()}</h2>
    </div>
  );
}
