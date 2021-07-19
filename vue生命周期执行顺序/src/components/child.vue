<template>
  <div>child</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  beforeCreate () {
    console.log('beforeCreate child')
  },
  created () {
    console.log('create child')
  },
  mounted () {
    console.log('mounted child')
  }
}
</script>

<style scoped lang="less">
</style>
