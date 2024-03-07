<!--
 * @Description: 组件
 * @Author: 小鱼
 * @Date: 2020-10-06 18:06:45
 * @LastEditors: 海象
 * @LastEditTime: 2020-12-13 16:34:41
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import "@/icons/svg/xx.svg";
console.log(process.env.foo);
console.log(process.env.VUE_APP_DONG);
export default {};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
