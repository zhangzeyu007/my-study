<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-08 16:00:09
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-08 17:03:56
 * @FilePath: \vue3-warter\src\components\input.vue
-->
<script setup>
import { inject } from 'vue'

const message = inject('message')

console.log(message, 'inject')
</script>

<template>
  <div>
    <!-- 自定义组件的双向绑定 :value @input -->
    <input :value="message" />
  </div>
</template>
