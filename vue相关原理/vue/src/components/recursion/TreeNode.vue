<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 15:44:46
 * @FilePath: \vue\src\components\recursion\TreeNode.vue
-->
<template>
  <div>
    <div @click="toggle" :style="{ paddingLeft: level - 1 + 'em' }">
      <label>{{ model.title }}</label>
      <span v-if="isFolder">[{{ open ? "-" : "+" }}]</span>
    </div>
    <div v-show="open">
      <tree-node
        class="item"
        v-for="model in model.children"
        :model="model"
        :key="model.title"
        :level="level + 1"
      >
      </tree-node>
    </div>
  </div>
</template>

<script>
export default {
  name: "tree-node",
  props: {
    model: Object,
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    }
  }
};
</script>

<style scoped></style>
