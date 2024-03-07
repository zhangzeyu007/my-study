<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 12:05:12
 * @FilePath: \vue\src\components\communication\Grandson.vue
-->

<template>
  <div class="Grandson" @click="$emit('some-event', 'some msg from grandsome')">
    <h3>Grandson</h3>
    <p>{{ msg }}</p>
    <!-- inject 用法 -->
    <p>{{ foo1 }}</p>
  </div>
</template>

<script>
export default {
  inject: {
    foo1: {
      from: "foo"
    }
  },
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped></style>
