<template>
  <input
    type="text"
    v-bind="$attrs"
    :value="todoTitle"
    @input="onInputChange"
  />
</template>

<script>
export default {
  props: {
    todoTitle: {
      type: String,
      default: "",
    },
  },
  methods: {
    onInputChange(e) {
      this.$emit("update:todoTitle", e.target.value);
    },
  },
};
</script>
<style scoped>
</style>