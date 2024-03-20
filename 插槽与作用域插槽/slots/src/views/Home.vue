<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2021-04-10 09:59:31
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-19 10:57:34
 * @FilePath: \my-study\插槽与作用域插槽\slots\src\views\Home.vue
-->


<template>
  <div class="home">
    <h1>插槽与作用域插槽</h1>
    <current-slots>
      <!-- 插槽 -->
      <template v-slot:default="slotPrpops">
        {{ slotPrpops.user.age }}
      </template>
      <!-- 具名插槽 解构插槽-->
      <template v-slot:book="{ user }">
        {{ user.age }}
      </template>
    </current-slots>
  </div>
</template>

<script>

import currentSlots from "../components/currentSlots.vue";

export default {
  name: "Home",
  components: {
    currentSlots,
  }
}

</script>
