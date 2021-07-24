<template>
  <div>子组件child</div>
</template>

<script>
export default {
  beforeCreate () {
    console.log('beforeCreate child')
  },

  created () {
    console.log('create child----****')
  },

  beforeMount () {
    console.log('beforeMount child')
  },

  mounted () {
    console.log('mounted child')
    console.log(this.$parent)
    this.$parent.goto()
    console.log('---child--')
  },

  beforeUpdate () {
    console.log('beforeUpdate child')
  },

  updated () {
    console.log('update child')
  },

  beforeDestroy () {
    console.log('beforeDestroy child')
  },

  destroyed () {
    console.log('destroyed child')
  },

  methods: {
    go () {
      console.log('父调用的')
    }
  }
}
</script>

<style scoped lang="less">
</style>
