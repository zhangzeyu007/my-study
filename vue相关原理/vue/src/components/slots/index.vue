<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-07 12:55:29
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-07 19:14:23
 * @FilePath: \my-study\vue相关原理\vue\src\components\slots\index.vue
-->

<template>
  <div>
    <h2>插槽</h2>
    <layout>
      <!-- 具名插槽 -->
      <template v-slot:header> 开课吧全找课程</template>
      <!-- 匿名插槽 -->
      <template>
        content内容区
      </template>
      <!-- 作用域插槽 -->
      <template v-slot:footer="{ fc }">{{ fc }}</template>
    </layout>
  </div>
</template>

<script>
import Layout from "@/components/slots/Layout.vue";

export default {
  components: {
    Layout,
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
