<template>
 <div>
  <button @click="show = !show">点击</button>
  <transition name="fade">
    <p v-if="show">Toggle</p>
  </transition>
 </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style  scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>