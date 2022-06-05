<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-06-05 17:27:32
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-05 19:11:43
 * @FilePath: \my-study\vite学习\vite-project\src\App.vue
-->
<script setup></script>
<script>
import { reactive, toRefs } from "vue";
export default {
  name: "app",
  setup() {
    let state = reactive({ count: 0 });

    const handleClick = function () {
      state.count++;
    };

    return {
      ...toRefs(state),
      handleClick,
    };
  },
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>{{ count }}</div>
  <button @click="handleClick">添加剂</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
