<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 10:32:33
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 12:11:50
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="login">登入</button>
    <button @click="loginOut">登出</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Home",
  methods: {
    login() {
      // commit的使用
      this.$store.commit("user/login", "张泽雨");
    },
    loginOut() {
      // action的使用
      this.$store
        .dispatch("user/loginOut", "登出")
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      // action 映射写法
      this["user/loginOut"]("登出")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ...mapActions(["user/loginOut"]),
  },
};
</script>
