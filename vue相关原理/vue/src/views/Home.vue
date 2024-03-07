<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-14 10:03:11
 * @FilePath: \vue\src\views\Home.vue
-->

<template>
  <div class="home">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <!-- <svg>
      <use xlink:href="#icon-xx"></use>
    </svg> -->
    <svg-icon icon-class="xx"></svg-icon>
    <svg-icon icon-class="nv"></svg-icon>
    <p @click="$store.commit('add')">counnter:{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">
      async counnter:{{ $store.state.counter }}
    </p>
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- 事件总线引入 -->
    <communcation />
    <!-- 插槽 -->
    <slotVm />
    <!-- KForm 组件 -->
    <k-form />
    <!-- Tree 组件 -->
    <Tree />
  </div>
</template>

<script>
import communcation from "../components/communication/index";
import slotVm from "../components/slots/index";
import KForm from "../components/form/index";
import Tree from "../components/recursion/index";
export default {
  components: {
    communcation,
    slotVm,
    KForm,
    Tree
  }
};
</script>
