/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-14 22:34:03
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-14 22:54:52
 * @FilePath: \my-study\React基础学习\my-test\src\index.js
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

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
