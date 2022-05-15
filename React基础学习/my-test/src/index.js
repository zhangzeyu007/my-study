/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-14 22:34:03
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-15 13:21:50
 * @FilePath: \my-study\React基础学习\my-test\src\index.js
 */

import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.module.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import logo from "./logo192.png";

const name = "React";
const obj = {
  firstName: "zzy",
  test: "hahh",
};

function formateName(name) {
  return name.firstName + "---" + name.test;
}

const greet = <div>good</div>;
const show = false;
const arr = [0, 1, 2];

const jsx = (
  <div className={styles.app}>
    hello,
    {name}
    {formateName(obj)}
    {greet}
    {show ? greet : "开发"}
    <ul>
      {arr.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    <img src={logo} className={styles.logo} />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
