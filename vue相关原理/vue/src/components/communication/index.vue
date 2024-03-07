<!--
 * @Description: 组件
 * @Author: 小鱼
 * @Date: 2020-10-06 18:30:19
 * @LastEditors: 小鱼
 * @LastEditTime: 2020-10-06 19:23:46
-->
<template>
  <div>
    <h2>组件通信</h2>
    <!-- props , 自定义事件 -->
    <Child1 msg="some msg from parent" @some-event="onSomeEvent" />
    <!-- 事件总线 -->
    <Child2 msg="some msg from parent" @some-event="onSomeEvent" />
  </div>
</template>

<script>
import Child1 from "./child1";
import Child2 from "./child2";

export default {
  components: {
    Child1,
    Child2
  },
  provide() {
    return {
      foo: "foo"
    };
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onSomeEvent(msg) {
      console.log("父组件:", msg);
    }
  }
};
</script>

<style scoped></style>
