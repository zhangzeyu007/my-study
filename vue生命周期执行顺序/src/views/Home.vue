<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <child-compent></child-compent>
  </div>
</template>

<script>
import ChildCompent from '../components/child.vue'

export default {
  name: 'Home',
  components: {
    ChildCompent
  },
  beforeCreate () {
    console.log('beforeCreate parent')
  },
  created () {
    console.log('created parent')
  },
  mounted () {
    console.log('mounted parent')
  }
}
</script>
