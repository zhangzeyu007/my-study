<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-06 10:53:40
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-08 10:33:34
 * @FilePath: \vue3-warter\src\views\About.vue
-->
<template>
  <div>{{ object.id }} fddsf</div>
  <span>{{ publishedBooksMessage }}</span>
  <span>{{ plusOne }}plusOne</span>
  <div v-for="(item, index) in myObject" :Key="index">
    <p>{{ item }}</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, toRefs, toRef, isRef, unref, isProxy } from 'vue'

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map)
console.log(map.get('count').value)

const object = { id: ref(1) }
const { id } = object
console.log(id.value)

const author = reactive({
  name: 'John Doe',
  books: ['Vue 2 - Advanced Guide', 'Vue 3 - Basic Guide', 'Vue 4 - The Mystery'],
  num: 0,
  ff: 1
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})

// 一个计算属性 getter/setter
const plusOne = computed({
  get: () => {
    console.log('get')
    return author.ff
  },
  set: (v) => {
    console.log('set', v)
    return (author.ff = v)
  }
})
// console.log(author.num, '获取')
// plusOne.value = 10
console.log(plusOne)

const counte = ref(0)
const fff = reactive({
  name: 'd',
  age: 10
})
console.log(isRef(counte), 'isRef')
console.log(unref(counte), 'unref')
console.log('---------')
console.log(isRef(fff), 'isRef')
console.log(unref(fff), 'unref')
console.log('---------')
console.log(toRefs(fff))
console.log(fff.name, fff.age)
console.log(toRef(fff, 'age'))
let age = toRef(fff, 'age')
console.log(age.value)
console.log('---------')
console.log(isProxy(fff))
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
// cookie操作
// 设置 Cookie
function setCookie(name, value, days) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
setCookie('name', '张泽雨')
</script>
