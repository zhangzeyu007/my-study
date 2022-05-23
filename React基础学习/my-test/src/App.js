/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-14 22:34:03
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-21 13:16:23
 * @FilePath: \my-study\React基础学习\my-test\src\App.js
 */
import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ClassComponent from "./pages/ClassComponent";
import FunctionCompoent from "./pages/FunctionCompoent";
import SetStateCompoent from "./pages/SetState";
import Layout from "./pages/layout/Layout";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ClassComponent />
        <FunctionCompoent />
        <SetStateCompoent />
        <Layout showTopBar={false} showBottomBar={true} title="商城">
          <div>
            <h3>HomePage</h3>
          </div>
        </Layout>
        <HomePage></HomePage>
      </header>
    </div>
  );
}

export default App;
