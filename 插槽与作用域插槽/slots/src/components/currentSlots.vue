<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-10 10:13:03
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-10 10:31:35
-->
<template>
  <div>
    <slot :user="user">
      {{ user.name }}
    </slot>
    <slot name="book" :user="user"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "张泽雨",
        age: 29,
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>