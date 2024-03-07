<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 12:57:13
 * @FilePath: \vue\src\components\form\KFormItem.vue
-->
<template>
  <div>
    <!-- label -->
    <label class="label" v-if="label">{{ label }}</label>
    <slot></slot>
    <!-- 错误信息 -->
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
import emmiter from "../../mixins/emitter";

export default {
  name: "KFormItem",
  componentName: "KFormItem",
  mixins: [emmiter],
  inject: ["form"],
  data() {
    return {
      error: ""
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
    // 派发事件通知KForm, 新增一个KFormItem实例
    if (this.prop) {
      this.dispatch("KForm", "kkb.form.addField", [this]);
    }
  },
  methods: {
    validate() {
      // 校验规则
      const rules = this.form.rules[this.prop];
      // 当前值
      const value = this.form.model[this.prop];
      // 创建一个校验器的实例
      const schema = new Schema({ [this.prop]: rules });
      // 校验返回Promise
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.label {
  display: inline-block;
}
</style>
