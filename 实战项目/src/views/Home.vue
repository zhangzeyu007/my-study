<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-27 14:33:44
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-29 16:41:50
-->
<template>
  <div class="home">
    <!-- <header-bar></header-bar> -->
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
// import HeaderBar from "../components/headerBar.vue";
import FooterBar from "../components/footerBar.vue";
export default {
  name: "Home",
  components: {
    // HeaderBar,
    FooterBar,
  },
};
</script>

<style lang="less" scope>
.box {
  width: 100%;
}
</style>
