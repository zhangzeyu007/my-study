<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 10:32:33
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 12:21:53
-->
<template>
  <div class="about">
    <h1>正常使用:{{ $store.state.user.content }}</h1>
    <h1>computed方法:{{ content }}</h1>
    <h1>映射方法:{{ isLogin }}</h1>
    <h1>派生方法:{{ welcome }}</h1>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("user", ["isLogin"]),
    ...mapGetters("user", ["welcome"]),
    content() {
      return this.$store.state.user.content;
    },
  },
  mounted() {
    // 严格模式测试
    // this.$store.state.user.username = 'zzzt'
  },
};
</script>
