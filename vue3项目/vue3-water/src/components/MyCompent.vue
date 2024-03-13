<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-05 18:28:34
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-07 11:53:57
 * @FilePath: \vue3-warter\src\components\MyCompent.vue
-->

<template>
  <div v-bind:id="dynamicId">{{ rawtemplate }}</div>
  <div><span v-html="rawtemplate"></span></div>
  <div v-bind="objectOfAttrs">哈哈哈</div>
  <div>{{ message.split('').reverse().join('') }}</div>
  <div>{{ ok ? 'ok wode' : '' }}</div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ['title'],
  setup(props) {
    console.log(props.title, 'props 传递')
    const num = ref(0)
    const dynamicId = ref('my-component')
    const rawtemplate = ref('<div>我的count is {{ num }}</div>')
    const message = ref('hello world')
    const ok = ref(true)
    const objectOfAttrs = {
      id: 'container',
      class: 'wrapper',
      ff: 'fff'
    }
    return { num, rawtemplate, dynamicId, objectOfAttrs, message, ok }
  },
  template: `<div>我的count is {{ num }}</div>`
}
</script>
