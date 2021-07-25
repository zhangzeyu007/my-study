<template>
  <piechart
    @click="handleClick"
    :data="state.data"
    :x="200"
    :y="200"
  ></piechart>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const state = reactive({
      data: [
        {
          name: "大专",
          count: 200,
          color: "brown",
        },
        {
          name: "大学",
          count: 200,
          color: "yellow",
        },
        {
          name: "大专",
          count: 200,
          color: "brown",
        },
      ],
    });
    function handleClick() {
      state.data.push({ name: "其他", count: 200, color: "yellow" });
    }
    return {
      state,
      handleClick,
    };
  },
};
</script>

<style  scoped>
</style>