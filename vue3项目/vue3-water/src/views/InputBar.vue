<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-08 10:38:57
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-08 12:29:26
 * @FilePath: \vue3-warter\src\views\inputBar.vue
-->

<script setup>
import { defineProps, defineEmits, defineModel, useAttrs } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
console.log(props.modelValue, 'props.modelValue')
const title = defineModel('title')
console.log(title, 'title')

const attrs = useAttrs()
console.log(attrs, 'attrs')
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    v-bind="attrs"
  />
  <div>{{ title }}</div>
</template>
