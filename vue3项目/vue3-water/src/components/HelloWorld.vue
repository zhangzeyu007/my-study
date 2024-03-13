<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-04 20:14:22
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-07 13:02:29
 * @FilePath: \vue3-warter\src\components\HelloWorld.vue
-->

<template>
  <h1>你好{{ title }}</h1>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: '世界'
  }
})
console.log(props.title, ' props')
</script>
