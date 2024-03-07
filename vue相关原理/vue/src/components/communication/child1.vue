<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-11 17:16:25
 * @FilePath: \vue\src\components\communication\child1.vue
-->
<template>
  <div class="child1" @click="$emit('some-event', 'msg from child1')">
    <h2>child1</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$bus.$on("event-from-child2", msg => {
      console.log("child1", msg);
    });
  },
  methods: {}
};
</script>

<style scoped></style>
