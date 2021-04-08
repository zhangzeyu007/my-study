<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-02 14:31:24
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-15 12:13:18
-->

<template>
  <div class="fade">
    <div class="header">
      <p class="header-title">我们的考试</p>
      <div class="content">
        <p class="content-title">标题是我饿么</p>
        <p class="content-text">1、我的hi撒旦法第三方亏损对方</p>
        <div class="line"></div>
        <div class="main">
          <div class="main-item">
            <img class="icon" src="../../static/img/num_1.png" />
            <p>第三方</p>
          </div>
          <div class="main-item">
            <img class="icon" src="../../static/img/num_1.png" />
            <p>辅导费</p>
          </div>
        </div>
        <div class="main">
          <div class="main-item">
            <img class="icon" src="../../static/img/num_1.png" />
            <p>年会哦</p>
          </div>
          <div class="main-item">
            <img class="icon" src="../../static/img/num_1.png" />
            <p>我的</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="button">交卷</div>
        <el-button type="danger">张泽雨</el-button>
        <div class="box">
          <div class="con">我是中国</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie, setCookie, unSet } from "../util/cookie.js";

export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$api.personal.login((res) => {
        console.log(res);
      });
    },
  },
  mounted() {
    this.login();
    // setCookie("name", "詹泽宇");
    // setCookie("book", "我的生活");
    // console.log(getCookie("name"));
    // unSet("name");
    // sessionStorage.begin();
    // sessionStorage.setItem("kkk", "好的坏的和
    console.log(document.doctype.publicId);
    window.dbObject.init({
      db_name: "users",
      db_version: "1",
      db_store_name: "username",
    });
    // window.dbObject.put({ book: 78 }, 0);
  },
};
</script>

<style  scope>
.header {
  width: 100%;
  height: 200px;
  background-image: url("../../static/img/banner.png");
}
.header-title {
  text-align: center;
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  padding-top: 35px;
}
.content {
  margin: 25px 18px 0 18px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px rgba(10, 10, 10, 0.5);
  box-sizing: border-box;
}
.content-title {
  padding: 20px 18px 0 18px;
  font-weight: 600;
  text-align: left;
  font-weight: 500;
  box-sizing: border-box;
}
.content-text {
  padding: 15px 18px 0 18px;
  text-align: left;
  font-size: 14px;
  box-sizing: border-box;
}
.line {
  margin-top: 20px;
  border-top: 1px dashed;
}
.main {
  display: flex;
}
.main-item {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 5px 10px 5px;
  box-sizing: border-box;
}
.icon {
  width: 20px;
  height: 20px;
}
.footer {
  display: flex;
  justify-content: center;
}

.button {
  padding: 10px 20px;
  margin-top: 35px;
  box-sizing: border-box;
  background-image: linear-gradient(
    45deg,
    rgba(200, 200, 200, 0),
    rgba(100, 100, 100, 1)
  );
}
@keyframes fade_out {
  0% {
    color: black;
    background-color: chocolate;
  }
  33% {
    color: burlywood;
    background-color: cornsilk;
  }
  100% {
    color: cadetblue;
    background-color: cyan;
  }
}
.box {
  width: 100px;
  height: 100px;
  display: grid;
  animation: fade_out 5s linear infinite;
}
.con {
  align-self: center;
  justify-self: center;
}

.fade:hover {
  color: aqua;
  transition: color 200ms ease-in 50ms;
}
</style> 