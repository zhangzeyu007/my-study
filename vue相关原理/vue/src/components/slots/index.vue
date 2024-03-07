<!--
 * @Description: 组件
 * @Author: 小鱼
 * @Date: 2020-10-06 21:51:14
 * @LastEditors: 小鱼
 * @LastEditTime: 2020-10-06 22:19:41
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
    Layout
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
