<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-10 10:13:03
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-10 10:34:50
-->
<template>
  <div>
    <!-- 插槽 -->
    <slot :user="user">
      {{ user.name }}
    </slot>
    <!-- 具名插槽 -->
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
};
</script>

<style  scoped>
</style>