<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 15:44:56
 * @FilePath: \vue\src\components\recursion\Tree.vue
-->
<template>
  <div class="kkb-tree">
    <tree-node v-for="item in data" :key="item.title" :model="item" />
  </div>
</template>

<script>
import TreeNode from "@/components/recursion/TreeNode.vue";
export default {
  components: {
    TreeNode
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.kkb-tree {
  text-align: left;
}
</style>
