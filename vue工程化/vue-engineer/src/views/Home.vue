<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 13:02:21
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 15:23:54
-->
<template>
  <div class="home">
    {{ `${publicpath}` }}
    <!-- <img alt="Vue logo" :src="`${publicpath}assets/logo.png`" /> -->
    <icon-font></icon-font>
  </div>
</template>

<script>
import IconFont from "../components/IconFont.vue";
export default {
  name: "Home",
  data() {
    return {
      publicpath: process.env.BASE_URL,
    };
  },
  components: {
    IconFont,
  },
};
</script>
