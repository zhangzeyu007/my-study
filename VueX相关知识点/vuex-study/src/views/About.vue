<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 10:32:33
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 11:24:05
-->
<template>
  <div class="about">
    <h1>{{ $store.state.user.content }}</h1>
    <h1>{{ content }}</h1>
  </div>
</template>
<script>
export default {
  computed: {
    content() {
      return this.$store.state.user.content;
    },
  },
};
</script>
