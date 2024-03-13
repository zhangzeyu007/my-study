<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-07 13:10:09
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-12 14:35:42
 * @FilePath: \vue3-warter\src\views\Add.vue
-->

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['back', 'go'])

const handleClick = () => {
  emit('back', {
    data: '回传数33据'
  })
}
</script>

<template>
  <div>
    <button @click="handleClick">回传</button>
    <button @click="$emit('go', { data: 'ZOULE ' })">皱了</button>
  </div>
</template>
