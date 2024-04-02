<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-29 10:40:33
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-29 18:03:40
 * @FilePath: \vue3ts\src\App.vue
-->
<template>
  <router-view #="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import './styles/common';
</style>
