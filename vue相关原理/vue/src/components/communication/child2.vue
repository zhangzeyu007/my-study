<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-11 17:16:35
 * @FilePath: \vue\src\components\communication\child2.vue
-->
<template>
  <div class="child2">
    <h2>Child2</h2>
    {{ $attrs.msg }}
    <!-- 隔代传参, v-bind 会展开 $attrs -->
    <Grandson v-bind="$attrs" v-on="$listeners" />
    <button @click="sendToChild1">给child1发送消息</button>
  </div>
</template>

<script>
import Grandson from "./Grandson";

export default {
  components: {
    Grandson
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    sendToChild1() {
      // 利用事件总线发送事件
      this.$bus.$emit("event-from-child2", "some msg from child2");
    }
  }
};
</script>

<style scoped></style>
