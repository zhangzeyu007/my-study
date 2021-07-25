<template>
  <div @click="$emit('update:modelValue','小红s')">姓名: {{ modelValue }}</div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
};
</script>

<style  scoped>
</style>