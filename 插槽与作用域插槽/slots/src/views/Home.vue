<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-10 09:59:31
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-10 10:34:17
-->
<template>
  <div class="home">
    <h1>插槽与作用域插槽</h1>
    <current-slots>
      <!-- 插槽 -->
      <template v-slot:default="slotPrpops">
        {{ slotPrpops.user.age }}
      </template>
      <!-- 具名插槽 -->
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
  },
};
</script>
