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
