<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 15:45:07
 * @FilePath: \vue\src\components\recursion\index.vue
-->
<template>
  <Tree :data="treeData" />
</template>

<script>
import Tree from "@/components/recursion/Tree.vue";
export default {
  components: {
    Tree
  },
  data() {
    return {
      treeData: [
        {
          title: "Web全栈架构师",
          children: [
            {
              title: "Java架构师"
            },
            {
              title: "JS高级",
              children: [
                {
                  title: "ES6"
                },
                {
                  title: "动效"
                }
              ]
            },
            {
              title: "Web全栈",
              children: [
                {
                  title: "Vue训练营",
                  expand: true,
                  children: [
                    {
                      title: "组件化"
                    },
                    {
                      title: "源码"
                    },
                    {
                      title: "docker部署"
                    }
                  ]
                },
                {
                  title: "React",
                  children: [
                    {
                      title: "JSX"
                    },
                    {
                      title: "虚拟DOM"
                    }
                  ]
                },
                {
                  title: "Node"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped></style>
