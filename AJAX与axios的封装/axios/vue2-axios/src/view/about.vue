<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-11 14:49:40
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-11 18:12:20
-->



<template>
  <div class="about">
    <div class="title">学习css</div>
    <div class="box"></div>
    <div class="box2"></div>
    <div class="btn">按钮</div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
    <div class="banner">
      <div class="box6">
        <img src="../../static/img/banner.png" alt="" />
        <img src="../../static/img/banner2.jpeg" alt="" />
      </div>
    </div>
  </div>
</template>
<style>
body {
  padding: 0px;
  margin: 0px;
}
.title {
  font-size: 100px;
  -webkit-text-stroke: 1px red;
  color: transparent;
  text-shadow: -3px 1px 3px red;
}
.box {
  width: 100px;
  height: 100px;
  background: wheat;
  /* border-radius: 10px 20px 30px 40px / 10px 20px 30px 40px; */
  border-radius: 10px 20px 30px 40px;
  box-shadow: 3px 3px 5px inset #eeeeee;
}
.box2 {
  width: 100px;
  height: 200px;
  border: 1px solid greenyellow;
  /* border-radius: 100px; */
  border-left: 100px solid blue;
  border-radius: 100px;
}
.btn {
  width: 200px;
  height: 50px;
  margin: 0 auto;
  background: greenyellow;
  line-height: 50px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
  box-shadow: 5px 5px 3px #cccccc;
}
.btn:hover {
  box-shadow: 5px 5px 3px #cccccc inset;
}
.box3 {
  width: 200px;
  height: 200px;
  margin: 10px auto;
  border: 1px sold red;
  border-radius: 100px;
  box-shadow: 0px 0px 5px 5px red, 0px 0px 5px 10px orange,
    0px 0px 5px 20px greenyellow;
}
.box4 {
  width: 300px;
  height: 300px;
  border: 1px solid pink;
  margin: 0 auto;
  background-image: linear-gradient(red, green, yellow);
}
.box5 {
  background-color: pink;
  width: 200px;
  height: 200px;
  margin: 10px auto;
  transition-property: all;
  transition-duration: 4s;
  -o-transition-duration: linear;
}
.box5:hover {
  transform: translate(3px, -10px);
  box-shadow: 0px 0px 10px 10px #cccccc;
  background-color: green;
}
.banner {
  width: 2100px;
  height: 400px;
  overflow: hidden;
}
.box6 {
  width: 1200px;
  height: 400px;
  border: 5px solid palevioletred;
  animation: run 2s infinite 1ms;
}
.box6 > img {
  width: 600px;
  float: left;
}
@keyframes run {
  35% {
    margin-left: -600px;
  }
  100% {
    margin-left: -1200px;
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
};
</script>

