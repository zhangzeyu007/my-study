<template>
  <div class="">nextPage 页面</div>
</template>

<script>
import { emitter } from "./HelloWorld.vue";
export default {
  mounted() {
    emitter.on("someEvent", (msg) => {
      console.log(msg);
    });
  },
};
</script>
