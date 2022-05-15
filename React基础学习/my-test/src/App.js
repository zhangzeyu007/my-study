/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-14 22:34:03
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-15 13:27:52
 * @FilePath: \my-study\React基础学习\my-test\src\App.js
 */
import logo from "./logo.svg";
import "./App.css";
import ClassComponent from "./pages/ClassComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ClassComponent />
      </header>
    </div>
  );
}

export default App;
