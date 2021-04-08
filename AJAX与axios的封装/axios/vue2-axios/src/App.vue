<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-02 14:28:18
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-11 15:01:38
-->

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
