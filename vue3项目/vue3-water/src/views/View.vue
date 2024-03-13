<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-07 11:09:09
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-12 14:47:34
 * @FilePath: \vue3-warter\src\views\View.vue
-->

<template>
  <div>sdf{{ age }} --fggfg- {{ count }}</div>
  <InputBar
    v-model="count"
    v-model:title="titleName"
    class="ffff"
    data-id="777"
  ></InputBar>
  {{ count }}
</template>

<script setup>
import { reactive, watch, watchEffect, toRef, toRefs, ref } from 'vue'
import InputBar from './InputBar.vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 -fdg  Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ],
  num: 0,
  ff: 1
})

watch(
  () => author.ff,
  (newVal, oldVal) => {
    console.log(newVal, oldVal, 'watch')
  }
)
watchEffect(() => {
  console.log(author.ff, 'watchEffect')
})
author.ff = 20

const state = reactive({ count: 0 })

let age = toRef(state, 'count')
let { count } = toRefs(state)

console.log(age)

setInterval(() => {
  state.count++
}, 1000)
const titleName = ref('我是的看法')
</script>
