<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 13:36:37
 * @FilePath: \vue\src\components\form\KInput.vue
-->
<template>
  <div>
    <!-- 自定义组件的双向绑定 :value @input -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import emmiter from "../../mixins/emitter";

export default {
  inheritAttrs: false, // 禁止继承属性
  mixins: [emmiter],
  props: {
    type: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
      // 触发校验
      // this.$parent.$emit("validate");
      this.dispatch("KFormItem", "validate");
    }
  }
};
</script>

<style scoped></style>
