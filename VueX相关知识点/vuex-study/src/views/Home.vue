<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 10:32:33
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 11:23:34
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="login">登入</button>
    <button @click="loginOut">登出</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    login() {
      this.$store.commit("user/login", "登录成功");
    },
    loginOut() {
      this.$store
        .dispatch("user/loginOut", "登出")
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
