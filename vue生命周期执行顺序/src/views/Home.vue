<!--
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-07-19 20:16:18
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-04 11:33:41
 * @FilePath: \my-study\vue生命周期执行顺序\src\views\Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <child-compent ref="children"></child-compent>
  </div>
</template>

<script>
import ChildCompent from '../components/child.vue'

export default {

  components: {
    ChildCompent
  },

  beforeCreate () {
    console.log('beforeCreate parent')
  },

  created () {
    console.log('created parent---*****')
  },

  beforeMount () {
    console.log('beforeMount parent')
  },

  mounted () {
    console.log('mounted parent')
    console.log(this.$refs.children)
    console.log('----parent-----')
    this.$refs.children.go()
  },

  beforeUpdate () {
    console.log('beforeUpdate parent')
  },

  updated () {
    console.log('update parent')
  },

  beforeDestroy () {
    console.log('beforeDestroy parent')
  },

  destroyed () {
    console.log('destroyed parent')
  },

  methods: {
    goto () {
      console.log('子调用的')
    }
  }
}
</script>
